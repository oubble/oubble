import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import * as styles from "./Select.css";

export type SelectOption = { value: string; label: string };

type SelectProps = {
  value: string;
  options: SelectOption[];
  placeholder?: string;
  onChange: (value: string) => void;
  id?: string;
};

export function Select({ value, options, placeholder, onChange, id }: SelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function pick(next: string) {
    onChange(next);
    setOpen(false);
  }

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        id={id}
        className={styles.trigger}
        data-open={open}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={selected ? styles.value : `${styles.value} ${styles.placeholder}`}>
          {selected ? selected.label : (placeholder ?? "Selecione")}
        </span>
        <Icon name="chevronDown" size={18} className={styles.chevron} />
      </button>

      {open && (
        <div className={styles.menu} role="listbox">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={opt.value === value}
              className={styles.option}
              data-active={opt.value === value}
              onClick={() => pick(opt.value)}
            >
              {opt.label}
              {opt.value === value && (
                <Icon name="check" size={16} className={styles.tick} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
