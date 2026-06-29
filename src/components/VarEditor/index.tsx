import { useRef, useState, type ReactNode } from "react";
import * as styles from "./VarEditor.css";

type VarEditorProps = {
  value: string;
  onChange: (value: string) => void;
  labels: Record<string, string>;
  multiline?: boolean;
  placeholder?: string;
  rows?: number;
};

const TOKEN = /\{\{\s*(\w+)\s*\}\}/g;

function renderTokens(value: string, labels: Record<string, string>): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  let i = 0;
  while ((match = TOKEN.exec(value)) !== null) {
    if (match.index > last) nodes.push(value.slice(last, match.index));
    const key = match[1] ?? "";
    nodes.push(
      <span key={`p${i++}`} className={styles.pill}>
        {labels[key] ?? key}
      </span>,
    );
    last = match.index + match[0].length;
  }
  if (last < value.length) nodes.push(value.slice(last));
  // Trailing newline needs a spacer so the highlight matches the textarea height.
  nodes.push("\n");
  return nodes;
}

export function VarEditor({
  value,
  onChange,
  labels,
  multiline,
  placeholder,
  rows,
}: VarEditorProps) {
  const [focus, setFocus] = useState(false);
  const highlightRef = useRef<HTMLDivElement>(null);

  function syncScroll(el: HTMLTextAreaElement | HTMLInputElement) {
    if (!highlightRef.current) return;
    highlightRef.current.scrollTop = el.scrollTop;
    highlightRef.current.scrollLeft = el.scrollLeft;
  }

  const commonField = {
    value,
    placeholder,
    onChange: (e: { target: { value: string } }) => onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    spellCheck: false,
  };

  return (
    <div className={styles.root} data-focus={focus}>
      <div
        ref={highlightRef}
        aria-hidden="true"
        className={
          multiline
            ? styles.highlight
            : `${styles.highlight} ${styles.singleHighlight}`
        }
      >
        {renderTokens(value, labels)}
      </div>

      {multiline ? (
        <textarea
          {...commonField}
          rows={rows}
          className={`${styles.field} ${styles.area}`}
          onScroll={(e) => syncScroll(e.currentTarget)}
        />
      ) : (
        <input
          {...commonField}
          className={`${styles.field} ${styles.single}`}
          onScroll={(e) => syncScroll(e.currentTarget)}
        />
      )}
    </div>
  );
}
