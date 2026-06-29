import { Link } from "react-router";
import { api } from "@/lib/api";
import { useAsync } from "@/lib/useAsync";
import type { Lead } from "@/lib/types";
import { Spinner, EmptyState, ErrorState } from "@/components/State";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Button } from "@/components/Button";
import { Icon, type IconName } from "@/components/Icon";
import { PopNumber } from "@/components/PopNumber";
import { STAGE_LABEL } from "@/lib/labels";
import { fadeUp } from "@/styles/motion.css";
import * as styles from "./HomePage.css";

type KpiTone = "neutral" | "accent" | "warm" | "success";
type Kpi = { label: string; value: number; hint: string; icon: IconName; tone: KpiTone };

function buildKpis(leads: Lead[]): Kpi[] {
  const inProgress = leads.filter((l) =>
    ["reviewing", "contacted"].includes(l.stage),
  ).length;
  const contacted = leads.filter((l) =>
    ["contacted", "talking", "won"].includes(l.stage),
  ).length;
  const won = leads.filter((l) => l.stage === "won").length;
  return [
    { label: "Clientes na base", value: leads.length, hint: "Tudo que você já encontrou", icon: "clients", tone: "neutral" },
    { label: "Em andamento", value: inProgress, hint: "Pra avaliar, contatar e montar o site", icon: "sparkles", tone: "accent" },
    { label: "Já contatados", value: contacted, hint: "Receberam sua mensagem", icon: "message", tone: "warm" },
    { label: "Fechados", value: won, hint: "Viraram cliente", icon: "check", tone: "success" },
  ];
}

export function HomePage() {
  const { data, loading, error, reload } = useAsync(() => api.listLeads());

  if (loading) return <Spinner label="Carregando seus números" />;
  if (error) return <ErrorState onRetry={reload} />;

  const leads = data ?? [];

  if (leads.length === 0) {
    return (
      <EmptyState
        icon="search"
        title="Comece encontrando empresas"
        description="Escolha um nicho e uma cidade. O Oubble traz as empresas e já marca quais têm mais cara de oportunidade."
        action={
          <Link to="/buscar">
            <Button icon="search">Fazer a primeira busca</Button>
          </Link>
        }
      />
    );
  }

  const kpis = buildKpis(leads);
  const recent = [...leads]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 6);

  return (
    <div className={styles.page}>
      <section className={styles.kpiGrid}>
        {kpis.map((kpi, i) => (
          <article
            key={kpi.label}
            className={`${styles.kpiCard} ${fadeUp}`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <header className={styles.kpiHead}>
              <span className={styles.kpiIcon} data-tone={kpi.tone}>
                <Icon name={kpi.icon} size={18} />
              </span>
              <span className={styles.kpiLabel}>{kpi.label}</span>
            </header>
            <PopNumber value={kpi.value} className={styles.kpiValue} />
            <span className={styles.kpiHint}>{kpi.hint}</span>
          </article>
        ))}
      </section>

      <section className={styles.panel}>
        <header className={styles.panelHead}>
          <h2 className={styles.panelTitle}>Encontrados recentemente</h2>
          <Link to="/clientes" className={styles.panelLink}>
            Ver todos <Icon name="chevronRight" size={16} />
          </Link>
        </header>

        <ul className={styles.recentList}>
          {recent.map((lead) => (
            <li key={lead.id}>
              <Link to={`/clientes/${lead.id}`} className={styles.recentRow}>
                <ScoreBadge score={lead.score} temperature={lead.temperature} />
                <span className={styles.recentName}>{lead.companyName}</span>
                <span className={styles.recentCity}>{lead.city ?? "—"}</span>
                <span className={styles.recentStage}>{STAGE_LABEL[lead.stage]}</span>
                <Icon name="chevronRight" size={16} className={styles.recentChevron} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
