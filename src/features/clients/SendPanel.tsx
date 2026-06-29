import { useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";
import type { EmailTemplate, Lead } from "@/lib/types";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Select } from "@/components/Select";
import { Input } from "@/components/Input";
import { Card } from "@/components/Card";
import { popIn } from "@/styles/motion.css";
import * as styles from "./LeadPage.css";

const SEND_ERROR: Record<string, string> = {
  no_email: "Adicione o email da empresa para enviar.",
  no_template: "Escolha um modelo de mensagem.",
  email_unconfigured: "O envio de email não está disponível agora.",
  email_failed: "Não foi possível enviar agora. Tente de novo.",
};

/** Send the outreach email to a lead, picking a template and the example link. */
export function SendPanel({ lead, onSent }: { lead: Lead; onSent: (l: Lead) => void }) {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [email, setEmail] = useState(lead.email ?? "");
  const [templateId, setTemplateId] = useState("");
  const [exampleLink, setExampleLink] = useState(lead.mockupLink ?? "");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.listTemplates().then((list) => {
      setTemplates(list);
      if (list[0]) setTemplateId(list[0].id);
    });
  }, []);

  async function send() {
    setError(null);
    if (!email.trim()) {
      setError(SEND_ERROR.no_email ?? "Adicione o email da empresa.");
      return;
    }
    setStatus("sending");
    try {
      // Persist the email + example link on the lead, then send.
      const updated = await api.updateLead(lead.id, {
        email: email.trim(),
        mockupLink: exampleLink.trim() || null,
      });
      await api.sendToLead(lead.id, { templateId, exampleLink: exampleLink.trim() });
      setStatus("sent");
      onSent({ ...updated, stage: "contacted" });
    } catch (err) {
      const reason = err instanceof ApiError ? err.reason : "email_failed";
      setError(SEND_ERROR[reason] ?? "Não foi possível enviar agora.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <Card as="section" className={styles.card}>
        <div className={styles.sentBox}>
          <span className={`${styles.sentIcon} ${popIn}`}>
            <Icon name="check" size={20} />
          </span>
          <div>
            <h3 className={styles.cardTitle}>Mensagem enviada</h3>
            <p className={styles.muted}>O cliente passou para a etapa Contatado.</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card as="section" className={styles.card}>
      <h3 className={styles.cardTitle}>
        <Icon name="message" size={16} /> Enviar proposta
      </h3>

      <div className={styles.sendField}>
        <label className={styles.sendLabel}>Email da empresa</label>
        <Input
          value={email}
          placeholder="contato@empresa.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.sendField}>
        <label className={styles.sendLabel}>Modelo</label>
        <Select
          value={templateId}
          placeholder="Escolha um modelo"
          options={templates.map((t) => ({ value: t.id, label: t.name }))}
          onChange={setTemplateId}
        />
      </div>

      <div className={styles.sendField}>
        <label className={styles.sendLabel}>Link do exemplo</label>
        <Input
          value={exampleLink}
          placeholder="onde o cliente vê o site que você fez"
          onChange={(e) => setExampleLink(e.target.value)}
        />
      </div>

      {error && (
        <div className={styles.sendError}>
          <Icon name="close" size={14} /> {error}
        </div>
      )}

      <Button icon="message" onClick={send} disabled={status === "sending"}>
        {status === "sending" ? "Enviando" : "Enviar agora"}
      </Button>
    </Card>
  );
}
