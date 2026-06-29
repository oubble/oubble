import { Link } from "react-router";
import type { Lead } from "@/lib/types";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Icon } from "@/components/Icon";
import * as styles from "./LeadCard.css";

/** Compact signals that explain, at a glance, why a lead is worth attention. */
function signals(lead: Lead): string[] {
  const out: string[] = [];
  if (!lead.hasWebsite) out.push("Sem site");
  else if (!lead.hasSSL) out.push("Site inseguro");
  if (typeof lead.googleRating === "number" && lead.googleRating > 0 && lead.googleRating < 4)
    out.push(`${lead.googleRating.toFixed(1)} no Google`);
  if (typeof lead.totalReviews === "number" && lead.totalReviews >= 50)
    out.push(`${lead.totalReviews} avaliações`);
  return out;
}

export function LeadCard({ lead, dragging }: { lead: Lead; dragging?: boolean }) {
  return (
    <article className={styles.card} data-dragging={dragging ? "true" : undefined}>
      <div className={styles.head}>
        <ScoreBadge score={lead.score} temperature={lead.temperature} />
        <Link
          to={`/clientes/${lead.id}`}
          className={styles.open}
          aria-label="Abrir ficha"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <Icon name="chevronRight" size={16} />
        </Link>
      </div>

      <h3 className={styles.name}>{lead.companyName}</h3>

      {lead.city && (
        <span className={styles.city}>
          <Icon name="mapPin" size={13} />
          {lead.city}
        </span>
      )}

      {signals(lead).length > 0 && (
        <div className={styles.signals}>
          {signals(lead).map((s) => (
            <span key={s} className={styles.signal}>
              {s}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
