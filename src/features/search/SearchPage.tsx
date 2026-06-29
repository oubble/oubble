import { useState } from "react";
import { useNavigate } from "react-router";
import { api, ApiError } from "@/lib/api";
import type { ScanSource } from "@/lib/types";
import { NICHES } from "@/lib/niches";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Select } from "@/components/Select";
import { Input } from "@/components/Input";
import { Segmented } from "@/components/Segmented";
import { PopNumber } from "@/components/PopNumber";
import { fadeUp } from "@/styles/motion.css";
import { ScanningState } from "./ScanningState";
import * as styles from "./SearchPage.css";

type Country = "BR" | "US";

const SOURCE_OPTIONS: { value: ScanSource; label: string; hint: string }[] = [
  { value: "both", label: "Tudo", hint: "Mapa e busca juntos" },
  { value: "maps", label: "Mapa", hint: "Empresas com ficha no Google" },
  { value: "search", label: "Busca", hint: "Resultados abertos da web" },
];

const SCAN_ERROR_COPY: Record<string, string> = {
  missing_fields: "Preencha o nicho e a cidade para continuar.",
  maps_unconfigured: "A busca por mapa não está disponível agora.",
  maps_unavailable: "O mapa não respondeu. Tente de novo em instantes.",
  search_unconfigured: "A busca aberta não está disponível agora.",
  search_unavailable: "A busca aberta não respondeu. Tente de novo.",
  providers_unavailable: "Nenhuma fonte respondeu agora. Tente de novo.",
};

export function SearchPage() {
  const navigate = useNavigate();
  const [niche, setNiche] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState<Country>("BR");
  const [source, setSource] = useState<ScanSource>("both");
  const [quantity, setQuantity] = useState(25);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSearch = niche.trim().length > 0 && location.trim().length > 0;

  async function handleSearch() {
    if (!canSearch || scanning) return;
    setScanning(true);
    setError(null);
    try {
      const result = await api.scan({ niche, location, country, source, quantity });
      navigate(`/clientes?busca=${result.campaignId}`);
    } catch (err) {
      const reason = err instanceof ApiError ? err.reason : "providers_unavailable";
      setError(SCAN_ERROR_COPY[reason] ?? "Não foi possível buscar agora. Tente de novo.");
      setScanning(false);
    }
  }

  if (scanning) {
    return <ScanningState niche={niche} location={location} />;
  }

  return (
    <div className={styles.page}>
      <header className={`${styles.intro} ${fadeUp}`}>
        <h2 className={styles.introTitle}>Quem você quer encontrar?</h2>
        <p className={styles.introText}>
          Diga o tipo de negócio e onde. O Oubble traz as empresas e já marca
          quais têm mais cara de oportunidade.
        </p>
      </header>

      <div className={`${styles.form} ${fadeUp}`} style={{ animationDelay: "60ms" }}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="niche">
            Tipo de negócio
          </label>
          <Select
            id="niche"
            value={niche}
            placeholder="Escolha o tipo de negócio"
            options={NICHES.map((n) => ({ value: n.label, label: n.label }))}
            onChange={setNiche}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="location">
            Cidade
          </label>
          <Input
            id="location"
            inputSize="lg"
            placeholder={country === "BR" ? "Ex.: São Paulo" : "Ex.: Miami"}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <span className={styles.label}>País</span>
            <Segmented
              value={country}
              onChange={setCountry}
              options={[
                { value: "BR", label: "Brasil" },
                { value: "US", label: "Estados Unidos" },
              ]}
            />
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Onde buscar</span>
            <Segmented
              value={source}
              onChange={setSource}
              options={SOURCE_OPTIONS.map((opt) => ({
                value: opt.value,
                label: opt.label,
                title: opt.hint,
              }))}
            />
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles.quantityHead}>
            <span className={styles.label}>Quantas empresas</span>
            <PopNumber value={quantity} className={styles.quantityValue} />
          </div>
          <input
            type="range"
            min={5}
            max={100}
            step={5}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className={styles.range}
          />
        </div>

        {error && (
          <div className={`${styles.error} ${fadeUp}`} role="alert">
            <Icon name="close" size={16} />
            {error}
          </div>
        )}

        <Button size="lg" icon="search" disabled={!canSearch} onClick={handleSearch}>
          Encontrar empresas
        </Button>
      </div>
    </div>
  );
}
