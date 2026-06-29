import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon";
import * as styles from "./Segmented.css";

export type SegmentedOption<T extends string> = {
  value: T;
  label: ReactNode;
  icon?: IconName;
  title?: string;
};

type SegmentedProps<T extends string> = {
  value: T;
  options: SegmentedOption<T>[];
  onChange: (value: T) => void;
  size?: "sm" | "md";
  className?: string;
};

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  size = "md",
  className,
}: SegmentedProps<T>) {
  return (
    <div className={className ? `${styles.root} ${className}` : styles.root}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={styles.item({ size })}
          data-active={value === opt.value}
          title={opt.title}
          onClick={() => onChange(opt.value)}
        >
          {opt.icon && <Icon name={opt.icon} size={16} />}
          {opt.label}
        </button>
      ))}
    </div>
  );
}
