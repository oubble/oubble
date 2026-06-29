import type { DatabaseSync } from "node:sqlite";
import { getDb, now } from "./index.ts";
import type { Lead, Stage } from "../../src/lib/types.ts";

type LeadRow = {
  id: string;
  campaign_id: string | null;
  company_name: string;
  website: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  niche: string | null;
  place_id: string | null;
  source: string;
  google_rating: number | null;
  total_reviews: number | null;
  photos: string | null;
  has_website: number;
  has_ssl: number;
  score: number;
  temperature: string;
  score_reasons: string | null;
  stage: string;
  notes: string | null;
  mockup_link: string | null;
  created_at: string;
  updated_at: string;
};

function toLead(row: LeadRow): Lead {
  return {
    id: row.id,
    campaignId: row.campaign_id,
    companyName: row.company_name,
    website: row.website,
    phone: row.phone,
    email: row.email,
    address: row.address,
    city: row.city,
    niche: row.niche,
    placeId: row.place_id,
    source: row.source === "search" ? "search" : "maps",
    googleRating: row.google_rating,
    totalReviews: row.total_reviews,
    photos: row.photos ? (JSON.parse(row.photos) as string[]) : [],
    hasWebsite: row.has_website === 1,
    hasSSL: row.has_ssl === 1,
    score: row.score,
    temperature:
      row.temperature === "hot" || row.temperature === "warm"
        ? row.temperature
        : "cold",
    scoreReasons: row.score_reasons ? JSON.parse(row.score_reasons) : [],
    stage: row.stage as Stage,
    notes: row.notes,
    mockupLink: row.mockup_link,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type NewLead = Omit<Lead, "id" | "stage" | "createdAt" | "updatedAt"> & {
  id: string;
  stage?: Stage;
};

export function insertLead(
  ownerId: string,
  lead: NewLead,
  db: DatabaseSync = getDb(),
): void {
  const timestamp = now();
  db.prepare(
    `INSERT INTO leads (
      id, owner_id, campaign_id, company_name, website, phone, email, address,
      city, niche, place_id, source, google_rating, total_reviews, photos,
      has_website, has_ssl, score, temperature, score_reasons, stage, notes,
      mockup_link, created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
    ON CONFLICT (owner_id, place_id) WHERE place_id IS NOT NULL DO NOTHING`,
  ).run(
    lead.id,
    ownerId,
    lead.campaignId,
    lead.companyName,
    lead.website,
    lead.phone,
    lead.email,
    lead.address,
    lead.city,
    lead.niche,
    lead.placeId,
    lead.source,
    lead.googleRating,
    lead.totalReviews,
    JSON.stringify(lead.photos),
    lead.hasWebsite ? 1 : 0,
    lead.hasSSL ? 1 : 0,
    lead.score,
    lead.temperature,
    JSON.stringify(lead.scoreReasons),
    lead.stage ?? "found",
    lead.notes,
    lead.mockupLink,
    timestamp,
    timestamp,
  );
}

export function listLeads(ownerId: string, db: DatabaseSync = getDb()): Lead[] {
  const rows = db
    .prepare(
      "SELECT * FROM leads WHERE owner_id = ? ORDER BY score DESC, created_at DESC",
    )
    .all(ownerId) as LeadRow[];
  return rows.map(toLead);
}

export function getLead(
  ownerId: string,
  id: string,
  db: DatabaseSync = getDb(),
): Lead | null {
  const row = db
    .prepare("SELECT * FROM leads WHERE id = ? AND owner_id = ?")
    .get(id, ownerId) as LeadRow | undefined;
  return row ? toLead(row) : null;
}

type LeadPatch = Partial<
  Pick<Lead, "stage" | "notes" | "mockupLink" | "email" | "phone">
>;

export function updateLead(
  ownerId: string,
  id: string,
  patch: LeadPatch,
  db: DatabaseSync = getDb(),
): Lead | null {
  const columns: Record<keyof LeadPatch, string> = {
    stage: "stage",
    notes: "notes",
    mockupLink: "mockup_link",
    email: "email",
    phone: "phone",
  };

  const sets: string[] = [];
  const values: (string | null)[] = [];
  for (const key of Object.keys(patch) as (keyof LeadPatch)[]) {
    sets.push(`${columns[key]} = ?`);
    values.push(patch[key] ?? null);
  }
  if (sets.length === 0) return getLead(ownerId, id, db);

  sets.push("updated_at = ?");
  values.push(now());

  db.prepare(
    `UPDATE leads SET ${sets.join(", ")} WHERE id = ? AND owner_id = ?`,
  ).run(...values, id, ownerId);

  return getLead(ownerId, id, db);
}

export function deleteLead(
  ownerId: string,
  id: string,
  db: DatabaseSync = getDb(),
): void {
  db.prepare("DELETE FROM leads WHERE id = ? AND owner_id = ?").run(id, ownerId);
}
