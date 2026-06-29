import type { RawCompany } from "./scoring.ts";

/** Provider contract. Each source turns a niche + location into companies. */
export type SearchProvider = (
  niche: string,
  location: string,
  limit: number,
  country: string,
) => Promise<RawCompany[]>;

function hostname(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
  } catch {
    return null;
  }
}

// --- Google Places (Text Search, v1) ---

type PlacesResponse = {
  places?: Array<{
    id?: string;
    displayName?: { text?: string };
    formattedAddress?: string;
    nationalPhoneNumber?: string;
    websiteUri?: string;
    rating?: number;
    userRatingCount?: number;
    photos?: Array<{ name?: string }>;
    addressComponents?: Array<{ longText?: string; types?: string[] }>;
  }>;
};

const PLACES_FIELDS = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.nationalPhoneNumber",
  "places.websiteUri",
  "places.rating",
  "places.userRatingCount",
  "places.photos",
  "places.addressComponents",
].join(",");

function cityFrom(
  components?: Array<{ longText?: string; types?: string[] }>,
): string | null {
  if (!components) return null;
  const locality = components.find((c) => c.types?.includes("locality"));
  const fallback = components.find((c) =>
    c.types?.includes("administrative_area_level_2"),
  );
  return locality?.longText ?? fallback?.longText ?? null;
}

export const mapsProvider: SearchProvider = async (
  niche,
  location,
  limit,
  country,
) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) throw new Error("maps_unconfigured");

  const lang = country === "US" ? "en" : "pt-BR";
  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": PLACES_FIELDS,
      },
      body: JSON.stringify({
        textQuery: `${niche} em ${location}`,
        maxResultCount: Math.min(limit, 20),
        languageCode: lang,
        regionCode: country,
      }),
    },
  );

  if (!response.ok) throw new Error("maps_unavailable");
  const data = (await response.json()) as PlacesResponse;

  return (data.places ?? [])
    .filter((p) => p.displayName?.text)
    .map((p): RawCompany => {
      const website = p.websiteUri ?? null;
      return {
        placeId: p.id ?? null,
        companyName: p.displayName!.text!,
        website,
        phone: p.nationalPhoneNumber ?? null,
        address: p.formattedAddress ?? null,
        city: cityFrom(p.addressComponents),
        niche,
        googleRating: p.rating ?? null,
        totalReviews: p.userRatingCount ?? null,
        photos: (p.photos ?? [])
          .map((photo) =>
            photo.name
              ? `https://places.googleapis.com/v1/${photo.name}/media?maxWidthPx=640&key=${apiKey}`
              : null,
          )
          .filter((x): x is string => Boolean(x)),
        hasWebsite: Boolean(website),
        hasSSL: hostname(website) ? website!.startsWith("https://") : false,
        source: "maps",
      };
    });
};

// --- Serper (programmatic Google search) ---

type SerperResponse = {
  organic?: Array<{ title?: string; link?: string }>;
};

export const searchProvider: SearchProvider = async (niche, location, limit) => {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) throw new Error("search_unconfigured");

  const response = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: { "X-API-KEY": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ q: `${niche} ${location}`, num: Math.min(limit, 20) }),
  });

  if (!response.ok) throw new Error("search_unavailable");
  const data = (await response.json()) as SerperResponse;

  return (data.organic ?? [])
    .filter((r) => r.title && r.link)
    .map((r): RawCompany => {
      const website = r.link!;
      return {
        placeId: null,
        companyName: r.title!,
        website,
        phone: null,
        address: null,
        city: location,
        niche,
        googleRating: null,
        totalReviews: null,
        photos: [],
        hasWebsite: true,
        hasSSL: website.startsWith("https://"),
        source: "search",
      };
    });
};
