import type { DatabaseSync } from "node:sqlite";
import { getDb, now } from "./index.ts";

export function logEmail(
  ownerId: string,
  input: {
    id: string;
    leadId: string;
    templateId: string;
    templateName: string;
    subject: string;
  },
  db: DatabaseSync = getDb(),
): void {
  db.prepare(
    `INSERT INTO email_log (id, owner_id, lead_id, template_id, template_name, subject, sent_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    input.id,
    ownerId,
    input.leadId,
    input.templateId,
    input.templateName,
    input.subject,
    now(),
  );
}
