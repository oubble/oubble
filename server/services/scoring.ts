import type {
  ScoreReason,
  ScoringWeights,
  Temperature,
} from "../../src/lib/types.ts";

/** A raw company before scoring, as returned by a search provider. */
export type RawCompany = {
  placeId: string | null;
  companyName: string;
  website: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  niche: string | null;
  googleRating: number | null;
  totalReviews: number | null;
  photos: string[];
  hasWebsite: boolean;
  hasSSL: boolean;
  source: "maps" | "search";
};

export type ScoreResult = {
  score: number;
  temperature: Temperature;
  reasons: ScoreReason[];
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

function temperatureFor(score: number): Temperature {
  if (score >= 70) return "hot";
  if (score >= 40) return "warm";
  return "cold";
}

/**
 * Higher score = bigger opportunity. We reward digital weakness (no site, no
 * SSL, low rating) and business activity (volume of reviews = real customers).
 */
export function scoreCompany(
  company: RawCompany,
  weights: ScoringWeights,
): ScoreResult {
  const reasons: ScoreReason[] = [];
  const add = (label: string, max: number, applies: boolean) => {
    reasons.push({ label, points: applies ? max : 0, max });
  };

  add("Sem site próprio", weights.noWebsite, !company.hasWebsite);
  add(
    "Site sem conexão segura",
    weights.noSSL,
    company.hasWebsite && !company.hasSSL,
  );
  add(
    "Reputação abaixo de 4 estrelas",
    weights.lowRating,
    typeof company.googleRating === "number" &&
      company.googleRating > 0 &&
      company.googleRating < 4,
  );
  add(
    "Movimento real de clientes",
    weights.highReviews,
    typeof company.totalReviews === "number" && company.totalReviews >= 50,
  );

  const total = reasons.reduce((sum, r) => sum + r.points, 0);
  const score = clamp(total, 0, 100);

  return { score, temperature: temperatureFor(score), reasons };
}
