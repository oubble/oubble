import type { DatabaseSync } from "node:sqlite";
import { getDb, now } from "./index.ts";
import type { Campaign, ScanSource } from "../../src/lib/types.ts";

type CampaignRow = {
  id: string;
  niche: string;
  location: string;
  country: string;
  quantity: number;
  source: string;
  status: string;
  found_count: number;
  created_at: string;
};

function toCampaign(row: CampaignRow): Campaign {
  return {
    id: row.id,
    niche: row.niche,
    location: row.location,
    country: row.country,
    quantity: row.quantity,
    source: row.source as ScanSource,
    status: row.status as Campaign["status"],
    foundCount: row.found_count,
    createdAt: row.created_at,
  };
}

export function createCampaign(
  ownerId: string,
  input: {
    id: string;
    niche: string;
    location: string;
    country: string;
    quantity: number;
    source: ScanSource;
  },
  db: DatabaseSync = getDb(),
): void {
  db.prepare(
    `INSERT INTO campaigns (id, owner_id, niche, location, country, quantity, source, status, found_count, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'running', 0, ?)`,
  ).run(
    input.id,
    ownerId,
    input.niche,
    input.location,
    input.country,
    input.quantity,
    input.source,
    now(),
  );
}

export function finishCampaign(
  ownerId: string,
  id: string,
  status: "done" | "failed",
  foundCount: number,
  db: DatabaseSync = getDb(),
): void {
  db.prepare(
    "UPDATE campaigns SET status = ?, found_count = ? WHERE id = ? AND owner_id = ?",
  ).run(status, foundCount, id, ownerId);
}

export function listCampaigns(ownerId: string, db: DatabaseSync = getDb()): Campaign[] {
  const rows = db
    .prepare(
      "SELECT * FROM campaigns WHERE owner_id = ? ORDER BY created_at DESC LIMIT 100",
    )
    .all(ownerId) as CampaignRow[];
  return rows.map(toCampaign);
}
