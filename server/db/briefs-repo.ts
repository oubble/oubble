import type { DatabaseSync } from "node:sqlite";
import { getDb, now } from "./index.ts";

export type DesignBrief = {
  id: string;
  leadId: string;
  content: string;
  seed: string;
  createdAt: string;
};

type BriefRow = {
  id: string;
  lead_id: string;
  content: string;
  seed: string;
  created_at: string;
};

function toBrief(row: BriefRow): DesignBrief {
  return {
    id: row.id,
    leadId: row.lead_id,
    content: row.content,
    seed: row.seed,
    createdAt: row.created_at,
  };
}

export function saveBrief(
  ownerId: string,
  input: { id: string; leadId: string; content: string; seed: string },
  db: DatabaseSync = getDb(),
): DesignBrief {
  db.prepare(
    `INSERT INTO design_briefs (id, owner_id, lead_id, content, seed, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(input.id, ownerId, input.leadId, input.content, input.seed, now());
  return getBrief(ownerId, input.leadId, db)!;
}

/** Latest brief for a lead, if any. */
export function getBrief(
  ownerId: string,
  leadId: string,
  db: DatabaseSync = getDb(),
): DesignBrief | null {
  const row = db
    .prepare(
      "SELECT * FROM design_briefs WHERE lead_id = ? AND owner_id = ? ORDER BY created_at DESC LIMIT 1",
    )
    .get(leadId, ownerId) as BriefRow | undefined;
  return row ? toBrief(row) : null;
}
