import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { runScan } from "./services/engine.ts";
import { getDb } from "./db/index.ts";
import {
  insertLead,
  listLeads,
  getLead,
  updateLead,
  deleteLead,
} from "./db/leads-repo.ts";
import {
  createCampaign,
  finishCampaign,
  listCampaigns,
} from "./db/campaigns-repo.ts";
import { getSettings, saveSettings } from "./db/settings-repo.ts";
import { getBrief, saveBrief } from "./db/briefs-repo.ts";
import { generateDesignBrief } from "./services/design-engine.ts";
import {
  listTemplates,
  getTemplate,
  saveTemplate,
  deleteTemplate,
} from "./db/templates-repo.ts";
import { renderTemplate } from "./services/email-templates.ts";
import { sendEmail } from "./services/mailer.ts";
import { logEmail } from "./db/email-log-repo.ts";
import { requireAuth } from "./auth.ts";
import type { EmailTone, ScanSource, Stage } from "../src/lib/types.ts";

type Env = { Variables: { ownerId: string } };

getDb(); // initialize schema on boot

const app = new Hono<Env>();

app.get("/api/health", (c) => c.json({ ok: true }));

// Tudo abaixo exige login (Google) e e-mail autorizado.
app.use("/api/*", requireAuth);

// Confirma que o usuário logado está autorizado (passou pelo requireAuth).
app.get("/api/me", (c) => c.json({ ok: true, ownerId: c.get("ownerId") }));

// --- Settings ---

app.get("/api/settings", (c) => c.json(getSettings(c.get("ownerId"))));

app.put("/api/settings", async (c) => {
  const body = await c.req.json();
  return c.json(saveSettings(c.get("ownerId"), body));
});

// --- Leads ---

app.get("/api/leads", (c) => c.json(listLeads(c.get("ownerId"))));

app.get("/api/leads/:id", (c) => {
  const lead = getLead(c.get("ownerId"), c.req.param("id"));
  return lead ? c.json(lead) : c.json({ error: "not_found" }, 404);
});

app.patch("/api/leads/:id", async (c) => {
  const patch = await c.req.json();
  const lead = updateLead(c.get("ownerId"), c.req.param("id"), patch);
  return lead ? c.json(lead) : c.json({ error: "not_found" }, 404);
});

app.delete("/api/leads/:id", (c) => {
  deleteLead(c.get("ownerId"), c.req.param("id"));
  return c.json({ ok: true });
});

// --- Campaigns ---

app.get("/api/campaigns", (c) => c.json(listCampaigns(c.get("ownerId"))));

// --- Design brief (per-lead site prompt) ---

app.get("/api/leads/:id/brief", (c) => {
  const brief = getBrief(c.get("ownerId"), c.req.param("id"));
  return brief ? c.json(brief) : c.json({ brief: null });
});

app.post("/api/leads/:id/brief", (c) => {
  const ownerId = c.get("ownerId");
  const lead = getLead(ownerId, c.req.param("id"));
  if (!lead) return c.json({ error: "not_found" }, 404);
  const { content, seed } = generateDesignBrief(lead);
  const brief = saveBrief(ownerId, {
    id: crypto.randomUUID(),
    leadId: lead.id,
    content,
    seed,
  });
  return c.json(brief);
});

// --- Email templates ---

app.get("/api/templates", (c) => c.json(listTemplates(c.get("ownerId"))));

app.post("/api/templates", async (c) => {
  const body = (await c.req.json()) as {
    id?: string;
    name?: string;
    tone?: EmailTone;
    subject?: string;
    body?: string;
  };
  if (!body.name || !body.subject || !body.body) {
    return c.json({ error: "missing_fields" }, 400);
  }
  return c.json(
    saveTemplate(c.get("ownerId"), {
      id: body.id,
      name: body.name,
      tone: body.tone ?? "direto",
      subject: body.subject,
      body: body.body,
    }),
  );
});

app.delete("/api/templates/:id", (c) => {
  deleteTemplate(c.get("ownerId"), c.req.param("id"));
  return c.json({ ok: true });
});

// --- Send email to a lead ---

app.post("/api/leads/:id/send", async (c) => {
  const ownerId = c.get("ownerId");
  const body = (await c.req.json()) as {
    templateId?: string;
    exampleLink?: string;
  };
  const lead = getLead(ownerId, c.req.param("id"));
  if (!lead) return c.json({ error: "not_found" }, 404);
  if (!lead.email) return c.json({ error: "no_email" }, 400);

  const template = body.templateId ? getTemplate(ownerId, body.templateId) : null;
  if (!template) return c.json({ error: "no_template" }, 400);

  const settings = getSettings(ownerId);
  const values: Record<string, string> = {
    empresa: lead.companyName,
    cidade: lead.city ?? "",
    site: lead.website ?? "",
    link_exemplo: body.exampleLink ?? lead.mockupLink ?? "",
    seu_nome: settings.senderName ?? "",
    seu_cargo: settings.senderTitle ?? "",
  };

  const subject = renderTemplate(template.subject, values);
  const rendered = renderTemplate(template.body, values);

  try {
    await sendEmail({ to: lead.email, subject, body: rendered });
    logEmail(ownerId, {
      id: crypto.randomUUID(),
      leadId: lead.id,
      templateId: template.id,
      templateName: template.name,
      subject,
    });
    updateLead(ownerId, lead.id, { stage: "contacted" });
    return c.json({ ok: true });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "email_failed";
    return c.json({ error: reason }, 502);
  }
});

// --- Scan ---

app.post("/api/scan", async (c) => {
  const body = (await c.req.json()) as {
    niche?: string;
    location?: string;
    country?: string;
    source?: ScanSource;
    quantity?: number;
  };

  const niche = body.niche?.trim();
  const location = body.location?.trim();
  if (!niche || !location) {
    return c.json({ error: "missing_fields" }, 400);
  }

  const country = body.country === "US" ? "US" : "BR";
  const source: ScanSource =
    body.source === "maps" || body.source === "search" ? body.source : "both";
  const quantity = Math.min(Math.max(body.quantity ?? 25, 5), 100);

  const ownerId = c.get("ownerId");
  const settings = getSettings(ownerId);
  const campaignId = crypto.randomUUID();
  createCampaign(ownerId, { id: campaignId, niche, location, country, quantity, source });

  try {
    const results = await runScan({
      niche,
      location,
      country,
      source,
      limit: quantity,
      weights: settings.scoringWeights,
    });

    for (const company of results) {
      insertLead(ownerId, {
        id: crypto.randomUUID(),
        campaignId,
        companyName: company.companyName,
        website: company.website,
        phone: company.phone,
        email: null,
        address: company.address,
        city: company.city,
        niche: company.niche,
        placeId: company.placeId,
        source: company.source,
        googleRating: company.googleRating,
        totalReviews: company.totalReviews,
        photos: company.photos,
        hasWebsite: company.hasWebsite,
        hasSSL: company.hasSSL,
        score: company.score,
        temperature: company.temperature,
        scoreReasons: company.reasons,
        notes: null,
        mockupLink: null,
        stage: "found" satisfies Stage,
      });
    }

    finishCampaign(ownerId, campaignId, "done", results.length);
    return c.json({ campaignId, found: results.length });
  } catch (error) {
    finishCampaign(ownerId, campaignId, "failed", 0);
    const reason = error instanceof Error ? error.message : "scan_failed";
    return c.json({ error: reason }, 502);
  }
});

// Em produção, o mesmo processo serve o front buildado (dist/) e cai no
// index.html para as rotas do React Router. Em dev, o Vite cuida do front.
if (process.env.NODE_ENV === "production") {
  app.use("/assets/*", serveStatic({ root: "./dist" }));
  app.use("/*", serveStatic({ root: "./dist" }));
  app.get("/*", serveStatic({ path: "./dist/index.html" }));
}

const port = Number(process.env.PORT ?? 8787);
serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Oubble server on http://localhost:${info.port}`);
});
