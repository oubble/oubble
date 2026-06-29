/** Shared domain types. Used by both the React client and the Node server. */

export type ScanSource = "maps" | "search" | "both";
export type LeadSource = "maps" | "search";
export type Temperature = "hot" | "warm" | "cold";

/** Pipeline stages, in order. The pipeline UI renders one column per stage. */
export const PIPELINE_STAGES = [
  "found",
  "reviewing",
  "contacted",
  "talking",
  "won",
  "dropped",
] as const;

export type Stage = (typeof PIPELINE_STAGES)[number];

export type EmailTone = "direto" | "consultivo" | "ousado";

export type ScoreReason = {
  label: string;
  points: number;
  max: number;
};

export type ScoringWeights = {
  noWebsite: number;
  noSSL: number;
  lowRating: number;
  highReviews: number;
  manyCompetitorsOnline: number;
};

export type Lead = {
  id: string;
  campaignId: string | null;
  companyName: string;
  website: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  niche: string | null;
  placeId: string | null;
  source: LeadSource;
  googleRating: number | null;
  totalReviews: number | null;
  photos: string[];
  hasWebsite: boolean;
  hasSSL: boolean;
  score: number;
  temperature: Temperature;
  scoreReasons: ScoreReason[];
  stage: Stage;
  notes: string | null;
  mockupLink: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Campaign = {
  id: string;
  niche: string;
  location: string;
  country: string;
  quantity: number;
  source: ScanSource;
  status: "running" | "done" | "failed";
  foundCount: number;
  createdAt: string;
};

export type EmailTemplate = {
  id: string;
  name: string;
  tone: EmailTone;
  subject: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export type Settings = {
  senderName: string | null;
  senderTitle: string | null;
  senderEmail: string | null;
  defaultNiche: string | null;
  defaultLocation: string | null;
  defaultCountry: string;
  defaultQuantity: number;
  scoringWeights: ScoringWeights;
};
