import { create } from "zustand";
import type { Lead, Stage, Temperature } from "@/lib/types";
import { api } from "@/lib/api";

type ViewMode = "board" | "list" | "region";

type Filters = {
  query: string;
  temperatures: Temperature[];
  campaignId: string | null;
};

type ClientsState = {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  view: ViewMode;
  filters: Filters;

  load: () => Promise<void>;
  reset: () => void;
  setView: (view: ViewMode) => void;
  setQuery: (query: string) => void;
  toggleTemperature: (t: Temperature) => void;
  setCampaign: (id: string | null) => void;
  moveLead: (id: string, stage: Stage) => Promise<void>;
  removeLead: (id: string) => Promise<void>;
};

export const useClientsStore = create<ClientsState>((set, get) => ({
  leads: [],
  loading: true,
  error: null,
  view: "board",
  filters: { query: "", temperatures: [], campaignId: null },

  reset: () =>
    set({
      leads: [],
      loading: true,
      error: null,
      view: "board",
      filters: { query: "", temperatures: [], campaignId: null },
    }),

  load: async () => {
    set({ loading: true, error: null });
    try {
      const leads = await api.listLeads();
      set({ leads, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : "unknown",
      });
    }
  },

  setView: (view) => set({ view }),
  setQuery: (query) => set((s) => ({ filters: { ...s.filters, query } })),
  toggleTemperature: (t) =>
    set((s) => {
      const has = s.filters.temperatures.includes(t);
      return {
        filters: {
          ...s.filters,
          temperatures: has
            ? s.filters.temperatures.filter((x) => x !== t)
            : [...s.filters.temperatures, t],
        },
      };
    }),
  setCampaign: (id) => set((s) => ({ filters: { ...s.filters, campaignId: id } })),

  moveLead: async (id, stage) => {
    const prev = get().leads;
    // Optimistic: reflect the move immediately, roll back if the API fails.
    set({ leads: prev.map((l) => (l.id === id ? { ...l, stage } : l)) });
    try {
      await api.updateLead(id, { stage });
    } catch {
      set({ leads: prev });
    }
  },

  removeLead: async (id) => {
    const prev = get().leads;
    set({ leads: prev.filter((l) => l.id !== id) });
    try {
      await api.deleteLead(id);
    } catch {
      set({ leads: prev });
    }
  },
}));

export function selectFiltered(state: ClientsState): Lead[] {
  const { query, temperatures, campaignId } = state.filters;
  const q = query.trim().toLowerCase();
  return state.leads.filter((lead) => {
    if (campaignId && lead.campaignId !== campaignId) return false;
    if (temperatures.length && !temperatures.includes(lead.temperature))
      return false;
    if (q) {
      const haystack = `${lead.companyName} ${lead.city ?? ""} ${lead.website ?? ""}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}
