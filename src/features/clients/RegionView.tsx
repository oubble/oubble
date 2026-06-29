import { useMemo, type CSSProperties } from "react";
import type { Lead } from "@/lib/types";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Icon } from "@/components/Icon";
import { fadeUpItem } from "@/styles/motion.css";
import * as styles from "./RegionView.css";

function mapsUrl(lead: Lead): string {
  if (lead.placeId)
    return `https://www.google.com/maps/place/?q=place_id:${lead.placeId}`;
  const q = encodeURIComponent(`${lead.companyName} ${lead.city ?? ""}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function regionMapsUrl(city: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city)}`;
}

type Cluster = { city: string; leads: Lead[] };

/**
 * A geographic overview built only from data we already have — no paid map
 * loads. Leads group by city; each pin opens the real Google Maps in a new tab
 * (free, since it opens there). Clusters sort by how hot the opportunities are.
 */
export function RegionView({ leads }: { leads: Lead[] }) {
  const clusters = useMemo<Cluster[]>(() => {
    const map = new Map<string, Lead[]>();
    for (const lead of leads) {
      const city = lead.city?.trim() || "Sem cidade";
      const list = map.get(city) ?? [];
      list.push(lead);
      map.set(city, list);
    }
    return [...map.entries()]
      .map(([city, list]) => ({
        city,
        leads: list.sort((a, b) => b.score - a.score),
      }))
      .sort((a, b) => b.leads.length - a.leads.length);
  }, [leads]);

  return (
    <div className={styles.grid}>
      {clusters.map((cluster, i) => (
        <section
          key={cluster.city}
          className={`${styles.cluster} ${fadeUpItem}`}
          style={{ "--i": i } as CSSProperties}
        >
          <header className={styles.clusterHead}>
            <span className={styles.cityName}>
              <Icon name="mapPin" size={16} />
              {cluster.city}
            </span>
            <a
              href={regionMapsUrl(cluster.city)}
              target="_blank"
              rel="noreferrer"
              className={styles.regionLink}
            >
              Ver região <Icon name="external" size={13} />
            </a>
          </header>

          <div className={styles.pins}>
            {cluster.leads.map((lead) => (
              <a
                key={lead.id}
                href={mapsUrl(lead)}
                target="_blank"
                rel="noreferrer"
                className={styles.pin}
                data-temp={lead.temperature}
                title={`${lead.companyName} · abrir no Google Maps`}
              >
                <ScoreBadge score={lead.score} temperature={lead.temperature} />
                <span className={styles.pinName}>{lead.companyName}</span>
                <Icon name="external" size={14} className={styles.pinIcon} />
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
