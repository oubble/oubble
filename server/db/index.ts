import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));

/** Path to the on-disk database. Override with OUBBLE_DB_PATH if needed. */
const DB_PATH = process.env.OUBBLE_DB_PATH ?? join(here, "..", "..", "oubble.db");

/** owner_id usado antes do login existir. Migra para o uid do dono no 1º acesso. */
export const LEGACY_OWNER_ID = "owner";

let instance: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (instance) return instance;

  const db = new DatabaseSync(DB_PATH);
  const schema = readFileSync(join(here, "schema.sql"), "utf8");
  db.exec(schema);

  instance = db;
  return db;
}

/** Garante uma linha de settings para o usuário, para leituras nunca virem vazias. */
export function ensureUser(ownerId: string, db: DatabaseSync = getDb()): void {
  const existing = db
    .prepare("SELECT owner_id FROM settings WHERE owner_id = ?")
    .get(ownerId);
  if (existing) return;

  db.prepare(
    `INSERT INTO settings (owner_id, default_country, default_quantity, scoring_weights, updated_at)
     VALUES (?, 'BR', 25, ?, ?)`,
  ).run(ownerId, JSON.stringify(DEFAULT_SCORING_WEIGHTS), new Date().toISOString());
}

/**
 * Migração única dos dados legados (owner_id = "owner") para o uid do dono.
 * Só roda para o uid informado e só enquanto ainda existir dado legado, então
 * nenhum outro usuário consegue puxar o que era seu.
 */
export function migrateLegacyOwner(ownerId: string, db: DatabaseSync = getDb()): void {
  if (!ownerId || ownerId === LEGACY_OWNER_ID) return;
  const legacy = db
    .prepare("SELECT 1 FROM leads WHERE owner_id = ? LIMIT 1")
    .get(LEGACY_OWNER_ID);
  const legacySettings = db
    .prepare("SELECT 1 FROM settings WHERE owner_id = ? LIMIT 1")
    .get(LEGACY_OWNER_ID);
  if (!legacy && !legacySettings) return;

  // Tabelas com owner_id não-único: migração direta por UPDATE.
  const ownedTables = [
    "leads",
    "campaigns",
    "email_templates",
    "email_log",
    "design_briefs",
  ];
  db.prepare("BEGIN").run();
  try {
    for (const t of ownedTables) {
      db.prepare(`UPDATE ${t} SET owner_id = ? WHERE owner_id = ?`).run(
        ownerId,
        LEGACY_OWNER_ID,
      );
    }
    // settings tem owner_id como PK única. Se o usuário já tem uma linha
    // (criada no 1º login), removê-la antes de promover a legada — assim os
    // ajustes antigos do dono prevalecem sem violar a unicidade.
    db.prepare("DELETE FROM settings WHERE owner_id = ?").run(ownerId);
    db.prepare("UPDATE settings SET owner_id = ? WHERE owner_id = ?").run(
      ownerId,
      LEGACY_OWNER_ID,
    );
    db.prepare("COMMIT").run();
  } catch (e) {
    db.prepare("ROLLBACK").run();
    // Nunca deixar o login travado por causa da migração: limpa o legado
    // remanescente para que a próxima requisição funcione normalmente.
    for (const t of [...ownedTables, "settings"]) {
      try {
        db.prepare(`DELETE FROM ${t} WHERE owner_id = ?`).run(LEGACY_OWNER_ID);
      } catch {
        /* ignore */
      }
    }
    console.error("migrateLegacyOwner failed, legacy cleared:", e);
  }
}

export const DEFAULT_SCORING_WEIGHTS = {
  noWebsite: 35,
  noSSL: 15,
  lowRating: 15,
  highReviews: 10,
  manyCompetitorsOnline: 0,
} as const;

export function now(): string {
  return new Date().toISOString();
}
