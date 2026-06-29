import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Settings, ScoringWeights } from "@/lib/types";
import { Spinner, ErrorState } from "@/components/State";
import { Button } from "@/components/Button";
import type { CSSProperties } from "react";
import { Input } from "@/components/Input";
import { Card } from "@/components/Card";
import { PopNumber } from "@/components/PopNumber";
import { fadeUpItem } from "@/styles/motion.css";
import * as styles from "./SettingsPage.css";

const WEIGHT_LABELS: Record<keyof ScoringWeights, string> = {
  noWebsite: "Não tem site",
  noSSL: "Site sem conexão segura",
  lowRating: "Reputação abaixo de 4 estrelas",
  highReviews: "Muitas avaliações (negócio ativo)",
  manyCompetitorsOnline: "Concorrência forte online",
};

export function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [error, setError] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.getSettings().then(setSettings).catch(() => setError(true));
  }, []);

  if (error) return <ErrorState onRetry={() => location.reload()} />;
  if (!settings) return <Spinner label="Carregando seus ajustes" />;

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((s) => (s ? { ...s, [key]: value } : s));
  }

  function updateWeight(key: keyof ScoringWeights, value: number) {
    setSettings((s) =>
      s ? { ...s, scoringWeights: { ...s.scoringWeights, [key]: value } } : s,
    );
  }

  async function save() {
    if (!settings) return;
    await api.saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className={styles.page}>
      <Card as="section" className={styles.card}>
        <div>
          <h3 className={styles.cardTitle}>Como você assina os emails</h3>
          <p className={styles.cardHint}>
            Esses dados entram no lugar das variáveis dos seus modelos.
          </p>
        </div>
        <div className={styles.fields}>
          <Field
            label="Seu nome"
            value={settings.senderName ?? ""}
            onChange={(v) => update("senderName", v)}
          />
          <Field
            label="Seu cargo"
            value={settings.senderTitle ?? ""}
            onChange={(v) => update("senderTitle", v)}
            placeholder="Ex.: Designer"
          />
          <Field
            label="Email de resposta"
            value={settings.senderEmail ?? ""}
            onChange={(v) => update("senderEmail", v)}
            placeholder="voce@email.com"
          />
        </div>
      </Card>

      <Card as="section" className={styles.card}>
        <div>
          <h3 className={styles.cardTitle}>O que conta como oportunidade</h3>
          <p className={styles.cardHint}>
            Ajuste o peso de cada sinal. Quanto maior, mais ele empurra o score
            para cima.
          </p>
        </div>
        <div className={styles.weights}>
          {(Object.keys(WEIGHT_LABELS) as (keyof ScoringWeights)[]).map((key, i) => (
            <div
              key={key}
              className={`${styles.weightRow} ${fadeUpItem}`}
              style={{ "--i": i } as CSSProperties}
            >
              <span className={styles.weightLabel}>{WEIGHT_LABELS[key]}</span>
              <input
                type="range"
                min={0}
                max={40}
                step={5}
                value={settings.scoringWeights[key]}
                onChange={(e) => updateWeight(key, Number(e.target.value))}
                className={styles.range}
              />
              <PopNumber value={settings.scoringWeights[key]} className={styles.weightValue} />
            </div>
          ))}
        </div>
      </Card>

      <div className={styles.footer}>
        <Button icon={saved ? "check" : undefined} onClick={save}>
          {saved ? "Salvo" : "Salvar ajustes"}
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
