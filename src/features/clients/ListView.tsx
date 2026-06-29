import type { CSSProperties } from "react";
import { useNavigate } from "react-router";
import type { Lead, Stage } from "@/lib/types";
import { PIPELINE_STAGES } from "@/lib/types";
import { STAGE_LABEL } from "@/lib/labels";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Icon } from "@/components/Icon";
import { fadeUpItem } from "@/styles/motion.css";
import { useClientsStore } from "./store";
import * as styles from "./ListView.css";

export function ListView({ leads }: { leads: Lead[] }) {
  const navigate = useNavigate();
  const moveLead = useClientsStore((s) => s.moveLead);

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Empresa</th>
            <th className={styles.th}>Score</th>
            <th className={styles.thHideSm}>Cidade</th>
            <th className={styles.thHideSm}>Site</th>
            <th className={styles.th}>Etapa</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <tr
              key={lead.id}
              className={`${styles.row} ${fadeUpItem}`}
              style={{ "--i": Math.min(i, 12) } as CSSProperties}
              onClick={() => navigate(`/clientes/${lead.id}`)}
            >
              <td className={styles.tdName}>{lead.companyName}</td>
              <td className={styles.td}>
                <ScoreBadge score={lead.score} temperature={lead.temperature} />
              </td>
              <td className={styles.tdHideSm}>{lead.city ?? "—"}</td>
              <td className={styles.tdHideSm}>
                {lead.hasWebsite ? (
                  <span className={styles.siteYes}>
                    <Icon name="check" size={14} /> Tem
                  </span>
                ) : (
                  <span className={styles.siteNo}>Sem site</span>
                )}
              </td>
              <td className={styles.td} onClick={(e) => e.stopPropagation()}>
                <select
                  className={styles.select}
                  value={lead.stage}
                  onChange={(e) => void moveLead(lead.id, e.target.value as Stage)}
                >
                  {PIPELINE_STAGES.map((stage) => (
                    <option key={stage} value={stage}>
                      {STAGE_LABEL[stage]}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
