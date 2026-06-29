import type { DatabaseSync } from "node:sqlite";
import { getDb, now } from "./index.ts";
import type { EmailTemplate, EmailTone } from "../../src/lib/types.ts";
import { SEED_TEMPLATES } from "../services/email-templates.ts";

type TemplateRow = {
  id: string;
  name: string;
  tone: string;
  subject: string;
  body: string;
  created_at: string;
  updated_at: string;
};

function toTemplate(row: TemplateRow): EmailTemplate {
  return {
    id: row.id,
    name: row.name,
    tone: row.tone as EmailTone,
    subject: row.subject,
    body: row.body,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** Seed the three starter templates the first time the list is read. */
function ensureSeed(ownerId: string, db: DatabaseSync): void {
  const count = db
    .prepare("SELECT COUNT(*) AS n FROM email_templates WHERE owner_id = ?")
    .get(ownerId) as { n: number };
  if (count.n > 0) return;

  const ts = now();
  for (const tpl of SEED_TEMPLATES) {
    db.prepare(
      `INSERT INTO email_templates (id, owner_id, name, tone, subject, body, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(crypto.randomUUID(), ownerId, tpl.name, tpl.tone, tpl.subject, tpl.body, ts, ts);
  }
}

export function listTemplates(ownerId: string, db: DatabaseSync = getDb()): EmailTemplate[] {
  ensureSeed(ownerId, db);
  const rows = db
    .prepare("SELECT * FROM email_templates WHERE owner_id = ? ORDER BY created_at ASC")
    .all(ownerId) as TemplateRow[];
  return rows.map(toTemplate);
}

export function getTemplate(
  ownerId: string,
  id: string,
  db: DatabaseSync = getDb(),
): EmailTemplate | null {
  const row = db
    .prepare("SELECT * FROM email_templates WHERE id = ? AND owner_id = ?")
    .get(id, ownerId) as TemplateRow | undefined;
  return row ? toTemplate(row) : null;
}

export function saveTemplate(
  ownerId: string,
  input: { id?: string; name: string; tone: EmailTone; subject: string; body: string },
  db: DatabaseSync = getDb(),
): EmailTemplate {
  const ts = now();
  if (input.id) {
    db.prepare(
      `UPDATE email_templates SET name = ?, tone = ?, subject = ?, body = ?, updated_at = ?
       WHERE id = ? AND owner_id = ?`,
    ).run(input.name, input.tone, input.subject, input.body, ts, input.id, ownerId);
    return getTemplate(ownerId, input.id, db)!;
  }
  const id = crypto.randomUUID();
  db.prepare(
    `INSERT INTO email_templates (id, owner_id, name, tone, subject, body, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(id, ownerId, input.name, input.tone, input.subject, input.body, ts, ts);
  return getTemplate(ownerId, id, db)!;
}

export function deleteTemplate(
  ownerId: string,
  id: string,
  db: DatabaseSync = getDb(),
): void {
  db.prepare("DELETE FROM email_templates WHERE id = ? AND owner_id = ?").run(
    id,
    ownerId,
  );
}
