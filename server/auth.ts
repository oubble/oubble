import { initializeApp, cert, getApps, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import type { Context, Next } from "hono";
import { ensureUser, migrateLegacyOwner } from "./db/index.ts";

let app: App | null = null;

function admin(): App {
  if (app) return app;
  const raw = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT;
  if (!raw) throw new Error("auth_unconfigured");
  const serviceAccount = JSON.parse(raw);
  app =
    getApps()[0] ??
    initializeApp({ credential: cert(serviceAccount) });
  return app;
}

function allowedEmails(): Set<string> {
  return new Set(
    (process.env.ALLOWED_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  );
}

const migrated = new Set<string>();

/**
 * Valida o ID token do Firebase, confere a allowlist e injeta ownerId (uid)
 * no contexto. Sem token válido → 401. Fora da lista → 403.
 */
export async function requireAuth(c: Context, next: Next) {
  const header = c.req.header("Authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return c.json({ error: "no_token" }, 401);

  let decoded;
  try {
    decoded = await getAuth(admin()).verifyIdToken(token);
  } catch {
    return c.json({ error: "invalid_token" }, 401);
  }

  const email = (decoded.email ?? "").toLowerCase();
  const allow = allowedEmails();
  if (allow.size > 0 && !allow.has(email)) {
    return c.json({ error: "not_allowed" }, 403);
  }

  const ownerId = decoded.uid;

  // Migração única dos dados legados para o dono, no primeiro acesso dele.
  const legacyOwner = (process.env.LEGACY_OWNER_EMAIL ?? "").trim().toLowerCase();
  if (legacyOwner && email === legacyOwner && !migrated.has(ownerId)) {
    migrateLegacyOwner(ownerId);
    migrated.add(ownerId);
  }

  ensureUser(ownerId);
  c.set("ownerId", ownerId);
  await next();
}
