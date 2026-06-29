import type { DatabaseSync } from "node:sqlite";
import { getDb, now, DEFAULT_SCORING_WEIGHTS } from "./index.ts";
import type { Settings, ScoringWeights } from "../../src/lib/types.ts";

type SettingsRow = {
  sender_name: string | null;
  sender_title: string | null;
  sender_email: string | null;
  default_niche: string | null;
  default_location: string | null;
  default_country: string;
  default_quantity: number;
  scoring_weights: string | null;
};

export function getSettings(ownerId: string, db: DatabaseSync = getDb()): Settings {
  const row = db
    .prepare("SELECT * FROM settings WHERE owner_id = ?")
    .get(ownerId) as SettingsRow | undefined;

  const weights: ScoringWeights = row?.scoring_weights
    ? { ...DEFAULT_SCORING_WEIGHTS, ...JSON.parse(row.scoring_weights) }
    : { ...DEFAULT_SCORING_WEIGHTS };

  return {
    senderName: row?.sender_name ?? null,
    senderTitle: row?.sender_title ?? null,
    senderEmail: row?.sender_email ?? null,
    defaultNiche: row?.default_niche ?? null,
    defaultLocation: row?.default_location ?? null,
    defaultCountry: row?.default_country ?? "BR",
    defaultQuantity: row?.default_quantity ?? 25,
    scoringWeights: weights,
  };
}

export function saveSettings(
  ownerId: string,
  patch: Partial<Settings>,
  db: DatabaseSync = getDb(),
): Settings {
  const current = getSettings(ownerId, db);
  const next = { ...current, ...patch };

  db.prepare(
    `UPDATE settings SET
       sender_name = ?, sender_title = ?, sender_email = ?,
       default_niche = ?, default_location = ?, default_country = ?,
       default_quantity = ?, scoring_weights = ?, updated_at = ?
     WHERE owner_id = ?`,
  ).run(
    next.senderName,
    next.senderTitle,
    next.senderEmail,
    next.defaultNiche,
    next.defaultLocation,
    next.defaultCountry,
    next.defaultQuantity,
    JSON.stringify(next.scoringWeights),
    now(),
    ownerId,
  );

  return next;
}
