import type { CSSProperties } from "react";
import { Link } from "react-router";
import { api } from "@/lib/api";
import { useAsync } from "@/lib/useAsync";
import { COUNTRY_LABEL } from "@/lib/labels";
import { Spinner, EmptyState, ErrorState } from "@/components/State";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { PopNumber } from "@/components/PopNumber";
import { fadeUpItem } from "@/styles/motion.css";
import * as styles from "./SearchesPage.css";

const SOURCE_LABEL: Record<string, string> = {
  both: "Tudo",
  maps: "Mapa",
  search: "Busca",
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "agora";
  if (mins < 60) return `há ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `há ${hours} h`;
  const days = Math.floor(hours / 24);
  return `há ${days} d`;
}

export function SearchesPage() {
  const { data, loading, error, reload } = useAsync(() => api.listCampaigns());

  if (loading) return <Spinner label="Carregando seu histórico" />;
  if (error) return <ErrorState onRetry={reload} />;

  const campaigns = data ?? [];

  if (campaigns.length === 0) {
    return (
      <EmptyState
        icon="history"
        title="Nenhuma busca ainda"
        description="Toda busca que você fizer fica registrada aqui, pronta para revisitar."
        action={
          <Link to="/buscar">
            <Button icon="search">Fazer uma busca</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className={styles.list}>
      {campaigns.map((c, i) => (
        <Link
          key={c.id}
          to={`/clientes?busca=${c.id}`}
          className={`${styles.row} ${fadeUpItem}`}
          style={{ "--i": i } as CSSProperties}
        >
          <div className={styles.main}>
            <span className={styles.query}>
              {c.niche} em {c.location}
            </span>
            <span className={styles.meta}>
              {COUNTRY_LABEL[c.country] ?? c.country} · {SOURCE_LABEL[c.source] ?? c.source} ·{" "}
              {timeAgo(c.createdAt)}
            </span>
          </div>
          <div className={styles.result}>
            <PopNumber value={c.foundCount} className={styles.count} />
            <span className={styles.countLabel}>encontrados</span>
          </div>
          <Icon name="chevronRight" size={16} className={styles.chevron} />
        </Link>
      ))}
    </div>
  );
}
