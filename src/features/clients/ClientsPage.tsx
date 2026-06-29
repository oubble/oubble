import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import type { Temperature } from "@/lib/types";
import { TEMPERATURE_LABEL } from "@/lib/labels";
import { Spinner, EmptyState, ErrorState } from "@/components/State";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { Segmented } from "@/components/Segmented";
import { useClientsStore, selectFiltered } from "./store";
import { BoardView } from "./BoardView";
import { ListView } from "./ListView";
import { RegionView } from "./RegionView";
import * as styles from "./ClientsPage.css";

const TEMPERATURES: Temperature[] = ["hot", "warm", "cold"];

export function ClientsPage() {
  const [params] = useSearchParams();
  const campaignId = params.get("busca");

  const store = useClientsStore();
  const filtered = selectFiltered(store);

  useEffect(() => {
    void store.load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    store.setCampaign(campaignId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignId]);

  if (store.loading) return <Spinner label="Carregando seus clientes" />;
  if (store.error) return <ErrorState onRetry={() => void store.load()} />;

  if (store.leads.length === 0) {
    return (
      <EmptyState
        icon="clients"
        title="Nenhum cliente ainda"
        description="Faça uma busca e as empresas encontradas aparecem aqui para você organizar."
        action={
          <Link to="/buscar">
            <Button icon="search">Buscar empresas</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.search}>
          <Icon name="search" size={16} className={styles.searchIcon} />
          <Input
            className={styles.searchInput}
            placeholder="Buscar por nome, cidade ou site"
            value={store.filters.query}
            onChange={(e) => store.setQuery(e.target.value)}
          />
        </div>

        <div className={styles.chips}>
          {TEMPERATURES.map((t) => (
            <button
              key={t}
              className={styles.chip}
              data-active={store.filters.temperatures.includes(t)}
              data-temp={t}
              onClick={() => store.toggleTemperature(t)}
            >
              {TEMPERATURE_LABEL[t]}
            </button>
          ))}
        </div>

        <Segmented
          value={store.view}
          onChange={(v) => store.setView(v)}
          size="sm"
          options={[
            { value: "board", label: "Quadro", icon: "columns" },
            { value: "list", label: "Lista", icon: "layout" },
            { value: "region", label: "Mapa", icon: "mapPin" },
          ]}
        />
      </div>

      {campaignId && (
        <div className={styles.filterNote}>
          Mostrando só os clientes desta busca.
          <Link to="/clientes" className={styles.clearFilter}>
            Ver todos
          </Link>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon="search"
          title="Nada com esse filtro"
          description="Ajuste a busca ou os filtros para ver seus clientes."
        />
      ) : store.view === "board" ? (
        <BoardView leads={filtered} />
      ) : store.view === "list" ? (
        <ListView leads={filtered} />
      ) : (
        <RegionView leads={filtered} />
      )}
    </div>
  );
}
