import { Link, useParams } from "react-router";
import { api } from "@/lib/api";
import { useAsync } from "@/lib/useAsync";
import type { Lead, Stage } from "@/lib/types";
import { PIPELINE_STAGES } from "@/lib/types";
import { STAGE_LABEL } from "@/lib/labels";
import { Spinner, ErrorState } from "@/components/State";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PopNumber } from "@/components/PopNumber";
import { growBar, fadeUp } from "@/styles/motion.css";
import { useState } from "react";
import { DesignBriefPanel } from "./DesignBriefPanel";
import { SendPanel } from "./SendPanel";
import * as styles from "./LeadPage.css";

function mapsUrl(lead: Lead): string {
  if (lead.placeId)
    return `https://www.google.com/maps/place/?q=place_id:${lead.placeId}`;
  const q = encodeURIComponent(`${lead.companyName} ${lead.city ?? ""}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function LeadPage() {
  const { id = "" } = useParams();
  const { data, loading, error, reload, setData } = useAsync(
    () => api.getLead(id),
    [id],
  );

  if (loading) return <Spinner label="Abrindo a ficha" />;
  if (error || !data) return <ErrorState onRetry={reload} />;

  const lead = data;

  async function changeStage(stage: Stage) {
    const updated = await api.updateLead(lead.id, { stage });
    setData(updated);
  }

  return (
    <div className={`${styles.page} ${fadeUp}`}>
      <Link to="/clientes" className={styles.back}>
        <Icon name="chevronRight" size={16} className={styles.backIcon} />
        Voltar para clientes
      </Link>

      <header className={styles.header}>
        <div className={styles.headLeft}>
          <ScoreBadge score={lead.score} temperature={lead.temperature} size="lg" />
          <div>
            <h2 className={styles.name}>{lead.companyName}</h2>
            {lead.city && <span className={styles.city}>{lead.city}</span>}
          </div>
        </div>
        <a href={mapsUrl(lead)} target="_blank" rel="noreferrer">
          <Button variant="secondary" iconRight="external">
            Ver no mapa
          </Button>
        </a>
      </header>

      <div className={styles.grid}>
        <div className={styles.col}>
          <CompanyData lead={lead} />
          <ScoreBreakdown lead={lead} />
        </div>
        <div className={styles.col}>
          <ActionsCard lead={lead} onStage={changeStage} />
          <SendPanel lead={lead} onSent={setData} />
          <DesignBriefPanel lead={lead} />
        </div>
      </div>
    </div>
  );
}

function CompanyData({ lead }: { lead: Lead }) {
  const rows: { label: string; value: string; href?: string }[] = [
    { label: "Site", value: lead.website ?? "Não tem", href: lead.website ?? undefined },
    { label: "Telefone", value: lead.phone ?? "—" },
    { label: "Endereço", value: lead.address ?? "—" },
    {
      label: "Avaliação no Google",
      value:
        typeof lead.googleRating === "number"
          ? `${lead.googleRating.toFixed(1)} · ${lead.totalReviews ?? 0} avaliações`
          : "—",
    },
  ];
  return (
    <Card as="section" className={styles.card}>
      <h3 className={styles.cardTitle}>Dados da empresa</h3>
      {lead.photos.length > 0 && (
        <div className={styles.photos}>
          {lead.photos.slice(0, 6).map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Foto ${i + 1} de ${lead.companyName}`}
              className={styles.photo}
              loading="lazy"
              width={120}
              height={90}
            />
          ))}
        </div>
      )}
      <dl className={styles.dataList}>
        {rows.map((row) => (
          <div key={row.label} className={styles.dataRow}>
            <dt className={styles.dataLabel}>{row.label}</dt>
            <dd className={styles.dataValue}>
              {row.href ? (
                <a href={row.href} target="_blank" rel="noreferrer" className={styles.link}>
                  {row.value} <Icon name="external" size={13} />
                </a>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

function ScoreBreakdown({ lead }: { lead: Lead }) {
  const active = lead.scoreReasons.filter((r) => r.points > 0);
  return (
    <Card as="section" className={styles.card}>
      <h3 className={styles.cardTitle}>Por que vale a pena</h3>
      {active.length === 0 ? (
        <p className={styles.muted}>
          Sem sinais fortes de oportunidade nesta empresa.
        </p>
      ) : (
        <ul className={styles.reasons}>
          {active.map((reason) => (
            <li key={reason.label} className={styles.reason}>
              <span className={styles.reasonLabel}>{reason.label}</span>
              <span className={styles.reasonBar}>
                <span
                  className={`${styles.reasonFill} ${growBar}`}
                  style={{ width: `${(reason.points / reason.max) * 100}%` }}
                />
              </span>
              <span className={styles.reasonPoints}>
                +<PopNumber value={reason.points} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function ActionsCard({
  lead,
  onStage,
}: {
  lead: Lead;
  onStage: (stage: Stage) => void;
}) {
  const [stage, setStage] = useState<Stage>(lead.stage);
  return (
    <Card as="section" className={styles.card}>
      <h3 className={styles.cardTitle}>Etapa no funil</h3>
      <div className={styles.stagePicker}>
        {PIPELINE_STAGES.map((s) => (
          <button
            key={s}
            className={styles.stageOption}
            data-active={stage === s}
            onClick={() => {
              setStage(s);
              onStage(s);
            }}
          >
            {STAGE_LABEL[s]}
          </button>
        ))}
      </div>
    </Card>
  );
}
