import type {
  Campaign,
  EmailTemplate,
  EmailTone,
  Lead,
  ScanSource,
  Settings,
  Stage,
} from "@/lib/types";
import { auth } from "@/lib/firebase";

async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const token = (await auth.currentUser?.getIdToken()) ?? "";
  const response = await fetch(`/api${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new ApiError(body?.error ?? "request_failed", response.status);
  }
  return response.json() as Promise<T>;
}

export class ApiError extends Error {
  reason: string;
  status: number;
  constructor(reason: string, status: number) {
    super(reason);
    this.reason = reason;
    this.status = status;
  }
}

export const api = {
  me: () => request<{ ok: true; ownerId: string }>("/me"),
  listLeads: () => request<Lead[]>("/leads"),
  getLead: (id: string) => request<Lead>(`/leads/${id}`),
  updateLead: (id: string, patch: Partial<Pick<Lead, "stage" | "notes" | "mockupLink" | "email" | "phone">>) =>
    request<Lead>(`/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),
  deleteLead: (id: string) =>
    request<{ ok: true }>(`/leads/${id}`, { method: "DELETE" }),

  listCampaigns: () => request<Campaign[]>("/campaigns"),

  scan: (input: {
    niche: string;
    location: string;
    country: string;
    source: ScanSource;
    quantity: number;
  }) =>
    request<{ campaignId: string; found: number }>("/scan", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  getBrief: (leadId: string) =>
    request<DesignBrief | { brief: null }>(`/leads/${leadId}/brief`),
  generateBrief: (leadId: string) =>
    request<DesignBrief>(`/leads/${leadId}/brief`, { method: "POST" }),

  listTemplates: () => request<EmailTemplate[]>("/templates"),
  saveTemplate: (input: {
    id?: string;
    name: string;
    tone: EmailTone;
    subject: string;
    body: string;
  }) =>
    request<EmailTemplate>("/templates", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  deleteTemplate: (id: string) =>
    request<{ ok: true }>(`/templates/${id}`, { method: "DELETE" }),

  sendToLead: (leadId: string, input: { templateId: string; exampleLink?: string }) =>
    request<{ ok: true }>(`/leads/${leadId}/send`, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  getSettings: () => request<Settings>("/settings"),
  saveSettings: (patch: Partial<Settings>) =>
    request<Settings>("/settings", {
      method: "PUT",
      body: JSON.stringify(patch),
    }),
};

export type DesignBrief = {
  id: string;
  leadId: string;
  content: string;
  seed: string;
  createdAt: string;
};

export type { Stage };
