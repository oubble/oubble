import type { ScanSource, ScoringWeights } from "../../src/lib/types.ts";
import { mapsProvider, searchProvider } from "./providers.ts";
import { scoreCompany, type RawCompany, type ScoreResult } from "./scoring.ts";

export type ScoredCompany = RawCompany & ScoreResult;

function dedupeKey(company: RawCompany): string {
  if (company.placeId) return `pid:${company.placeId}`;
  return `name:${company.companyName.toLowerCase().trim()}:${(company.city ?? "").toLowerCase()}`;
}

/**
 * Run the requested sources, drop duplicates, score everything, return the
 * strongest opportunities first. Provider failures are tolerated as long as one
 * source still produced results.
 */
export async function runScan(opts: {
  niche: string;
  location: string;
  country: string;
  source: ScanSource;
  limit: number;
  weights: ScoringWeights;
}): Promise<ScoredCompany[]> {
  const providers = [];
  if (opts.source === "maps" || opts.source === "both") providers.push(mapsProvider);
  if (opts.source === "search" || opts.source === "both")
    providers.push(searchProvider);

  const seen = new Set<string>();
  const scored: ScoredCompany[] = [];
  const errors: string[] = [];

  for (const provider of providers) {
    try {
      const companies = await provider(
        opts.niche,
        opts.location,
        Math.max(opts.limit, 20),
        opts.country,
      );
      for (const company of companies) {
        const key = dedupeKey(company);
        if (seen.has(key)) continue;
        seen.add(key);
        scored.push({ ...company, ...scoreCompany(company, opts.weights) });
      }
    } catch (error) {
      errors.push(error instanceof Error ? error.message : "provider_failed");
    }
  }

  if (scored.length === 0 && errors.length === providers.length) {
    throw new Error(errors[0] ?? "providers_unavailable");
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, opts.limit);
}
