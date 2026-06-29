-- Oubble local database schema.
-- One file on disk, owned by node:sqlite. Single user today (owner_id is a
-- fixed constant), but every owned row already carries owner_id so multi-user
-- is a data migration later, not a rewrite.

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS campaigns (
  id          TEXT PRIMARY KEY,
  owner_id    TEXT NOT NULL,
  niche       TEXT NOT NULL,
  location    TEXT NOT NULL,
  country     TEXT NOT NULL DEFAULT 'BR',
  quantity    INTEGER NOT NULL,
  source      TEXT NOT NULL,              -- 'maps' | 'search' | 'both'
  status      TEXT NOT NULL,              -- 'running' | 'done' | 'failed'
  found_count INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_campaigns_owner ON campaigns (owner_id, created_at DESC);

CREATE TABLE IF NOT EXISTS leads (
  id            TEXT PRIMARY KEY,
  owner_id      TEXT NOT NULL,
  campaign_id   TEXT REFERENCES campaigns (id) ON DELETE SET NULL,

  company_name  TEXT NOT NULL,
  website       TEXT,
  phone         TEXT,
  email         TEXT,
  address       TEXT,
  city          TEXT,
  niche         TEXT,
  place_id      TEXT,
  source        TEXT NOT NULL,            -- 'maps' | 'search'

  google_rating REAL,
  total_reviews INTEGER,
  photos        TEXT,                     -- JSON array of URLs

  has_website   INTEGER NOT NULL DEFAULT 0,
  has_ssl       INTEGER NOT NULL DEFAULT 0,

  score         INTEGER NOT NULL DEFAULT 0,
  temperature   TEXT NOT NULL DEFAULT 'cold',  -- 'hot' | 'warm' | 'cold'
  score_reasons TEXT,                     -- JSON array of {label, points, max}

  stage         TEXT NOT NULL DEFAULT 'found', -- pipeline stage
  notes         TEXT,
  mockup_link   TEXT,

  created_at    TEXT NOT NULL,
  updated_at    TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_owner_stage ON leads (owner_id, stage);
CREATE INDEX IF NOT EXISTS idx_leads_campaign ON leads (campaign_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_dedupe ON leads (owner_id, place_id)
  WHERE place_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS email_templates (
  id         TEXT PRIMARY KEY,
  owner_id   TEXT NOT NULL,
  name       TEXT NOT NULL,
  tone       TEXT NOT NULL,               -- 'direto' | 'consultivo' | 'ousado'
  subject    TEXT NOT NULL,
  body       TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_templates_owner ON email_templates (owner_id);

CREATE TABLE IF NOT EXISTS email_log (
  id            TEXT PRIMARY KEY,
  owner_id      TEXT NOT NULL,
  lead_id       TEXT NOT NULL REFERENCES leads (id) ON DELETE CASCADE,
  template_id   TEXT,
  template_name TEXT,
  subject       TEXT,
  mockup_link   TEXT,
  sent_at       TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_email_log_lead ON email_log (lead_id, sent_at DESC);

CREATE TABLE IF NOT EXISTS design_briefs (
  id          TEXT PRIMARY KEY,
  owner_id    TEXT NOT NULL,
  lead_id     TEXT NOT NULL REFERENCES leads (id) ON DELETE CASCADE,
  content     TEXT NOT NULL,              -- the generated DESIGN.md
  seed        TEXT NOT NULL,              -- variation seed, keeps outputs unique
  created_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_briefs_lead ON design_briefs (lead_id, created_at DESC);

CREATE TABLE IF NOT EXISTS settings (
  owner_id        TEXT PRIMARY KEY,
  sender_name     TEXT,
  sender_title    TEXT,
  sender_email    TEXT,
  default_niche   TEXT,
  default_location TEXT,
  default_country TEXT NOT NULL DEFAULT 'BR',
  default_quantity INTEGER NOT NULL DEFAULT 25,
  scoring_weights TEXT,                   -- JSON
  updated_at      TEXT NOT NULL
);
