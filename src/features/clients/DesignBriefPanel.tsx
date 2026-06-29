import { useEffect, useState } from "react";
import { api, type DesignBrief } from "@/lib/api";
import type { Lead } from "@/lib/types";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Card } from "@/components/Card";
import * as styles from "./LeadPage.css";

/**
 * Per-lead site prompt (DESIGN.md). Generates a unique brief, lets the user
 * copy it into any AI or download it as DESIGN.md to build the HTML site.
 */
export function DesignBriefPanel({ lead }: { lead: Lead }) {
  const [brief, setBrief] = useState<DesignBrief | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    api.getBrief(lead.id).then((res) => {
      if (active && "id" in res) setBrief(res);
    });
    return () => {
      active = false;
    };
  }, [lead.id]);

  async function generate() {
    setBusy(true);
    try {
      setBrief(await api.generateBrief(lead.id));
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    if (!brief) return;
    await navigator.clipboard.writeText(brief.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function download() {
    if (!brief) return;
    const blob = new Blob([brief.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "DESIGN.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card as="section" className={styles.card}>
      <h3 className={styles.cardTitle}>
        <Icon name="sparkles" size={16} /> Prompt do site
      </h3>
      <p className={styles.muted}>
        Um briefing único para a IA criar o site deste cliente. Cada empresa
        gera um resultado diferente.
      </p>

      {!brief ? (
        <Button icon="sparkles" onClick={generate} disabled={busy}>
          {busy ? "Gerando" : "Gerar prompt do site"}
        </Button>
      ) : (
        <>
          <div className={styles.briefActions}>
            <Button size="sm" variant="primary" icon={copied ? "check" : "copy"} onClick={copy}>
              {copied ? "Copiado" : "Copiar"}
            </Button>
            <Button size="sm" variant="secondary" icon="external" onClick={download}>
              Baixar .md
            </Button>
            <Button size="sm" variant="ghost" icon="sparkles" onClick={generate} disabled={busy}>
              Gerar outro
            </Button>
          </div>
          <pre className={styles.briefPreview}>{brief.content}</pre>
        </>
      )}
    </Card>
  );
}
