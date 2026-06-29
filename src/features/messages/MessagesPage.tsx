import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import type { EmailTemplate, EmailTone } from "@/lib/types";
import { Spinner, ErrorState } from "@/components/State";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { Card } from "@/components/Card";
import { Segmented } from "@/components/Segmented";
import { VarEditor } from "@/components/VarEditor";
import { fadeUp } from "@/styles/motion.css";
import * as styles from "./MessagesPage.css";

const TONE_LABEL: Record<EmailTone, string> = {
  direto: "Direto",
  consultivo: "Consultivo",
  ousado: "Ousado",
};

const VARIABLES = [
  { key: "empresa", label: "Empresa" },
  { key: "cidade", label: "Cidade" },
  { key: "site", label: "Site" },
  { key: "link_exemplo", label: "Link do exemplo" },
  { key: "seu_nome", label: "Seu nome" },
  { key: "seu_cargo", label: "Seu cargo" },
];

const SAMPLE: Record<string, string> = {
  empresa: "Padaria do Bairro",
  cidade: "São Paulo",
  site: "padariadobairro.com.br",
  link_exemplo: "oubble.com/exemplo/padaria",
  seu_nome: "Você",
  seu_cargo: "Designer",
};

const VAR_LABEL: Record<string, string> = Object.fromEntries(
  VARIABLES.map((v) => [v.key, v.label]),
);

function render(text: string): string {
  return text.replace(
    /\{\{\s*(\w+)\s*\}\}/g,
    (_, k: string) => SAMPLE[k] ?? VAR_LABEL[k] ?? k,
  );
}

type Draft = { id?: string; name: string; tone: EmailTone; subject: string; body: string };

const EMPTY_DRAFT: Draft = { name: "", tone: "direto", subject: "", body: "" };

export function MessagesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[] | null>(null);
  const [error, setError] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);

  useEffect(() => {
    api
      .listTemplates()
      .then((list) => {
        setTemplates(list);
        if (list[0]) {
          setSelectedId(list[0].id);
          setDraft(list[0]);
        }
      })
      .catch(() => setError(true));
  }, []);

  const preview = useMemo(
    () => ({ subject: render(draft.subject), body: render(draft.body) }),
    [draft.subject, draft.body],
  );

  if (error) return <ErrorState onRetry={() => location.reload()} />;
  if (!templates) return <Spinner label="Carregando seus modelos" />;

  function select(t: EmailTemplate) {
    setSelectedId(t.id);
    setDraft(t);
  }

  function newDraft() {
    setSelectedId(null);
    setDraft(EMPTY_DRAFT);
  }

  async function save() {
    const saved = await api.saveTemplate(draft);
    const list = await api.listTemplates();
    setTemplates(list);
    setSelectedId(saved.id);
    setDraft(saved);
  }

  function insertVar(key: string) {
    setDraft((d) => ({ ...d, body: `${d.body}{{${key}}}` }));
  }

  async function remove(id: string) {
    await api.deleteTemplate(id);
    const list = await api.listTemplates();
    setTemplates(list);
    if (selectedId === id) {
      if (list[0]) {
        setSelectedId(list[0].id);
        setDraft(list[0]);
      } else {
        newDraft();
      }
    }
  }

  const canSave = draft.name.trim() && draft.subject.trim() && draft.body.trim();

  return (
    <div className={styles.layout}>
      <aside className={`${styles.list} ${fadeUp}`}>
        <Button size="sm" icon="plus" onClick={newDraft}>
          Novo modelo
        </Button>
        <div className={styles.listItems}>
          {templates.map((t) => (
            <div
              key={t.id}
              className={styles.listItem}
              data-active={selectedId === t.id}
            >
              <button className={styles.listSelect} onClick={() => select(t)}>
                <span className={styles.listName}>{t.name}</span>
                <span className={styles.listTone}>{TONE_LABEL[t.tone]}</span>
              </button>
              <button
                className={styles.listDelete}
                aria-label={`Excluir modelo ${t.name}`}
                title="Excluir modelo"
                onClick={() => void remove(t.id)}
              >
                <Icon name="trash" size={16} />
              </button>
            </div>
          ))}
        </div>
      </aside>

      <Card className={`${styles.editor} ${fadeUp}`} style={{ animationDelay: "60ms" }}>
        <div className={styles.field}>
          <label className={styles.label}>Nome do modelo</label>
          <Input
            value={draft.name}
            placeholder="Ex.: Primeiro contato"
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Tom</label>
          <Segmented
            value={draft.tone}
            onChange={(tone) => setDraft({ ...draft, tone })}
            options={(Object.keys(TONE_LABEL) as EmailTone[]).map((tone) => ({
              value: tone,
              label: TONE_LABEL[tone],
            }))}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Assunto</label>
          <VarEditor
            value={draft.subject}
            labels={VAR_LABEL}
            onChange={(subject) => setDraft({ ...draft, subject })}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Mensagem</label>
          <div className={styles.varRow}>
            {VARIABLES.map((v) => (
              <button key={v.key} className={styles.varChip} onClick={() => insertVar(v.key)}>
                {v.label}
              </button>
            ))}
          </div>
          <VarEditor
            multiline
            rows={10}
            value={draft.body}
            labels={VAR_LABEL}
            onChange={(body) => setDraft({ ...draft, body })}
          />
        </div>

        <Button icon="check" disabled={!canSave} onClick={save}>
          Salvar modelo
        </Button>
      </Card>

      <aside className={styles.preview}>
        <span className={styles.previewTag}>
          <Icon name="inbox" size={14} /> Prévia
        </span>
        <Card pad="md" key={selectedId ?? "new"} className={fadeUp}>
          <div className={styles.previewSubject}>{preview.subject || "Assunto"}</div>
          <div className={styles.previewBody}>{preview.body || "Sua mensagem aparece aqui."}</div>
        </Card>
        <p className={styles.previewNote}>
          As variáveis viram os dados de cada empresa na hora de enviar.
        </p>
      </aside>
    </div>
  );
}
