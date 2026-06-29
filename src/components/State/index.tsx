import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { fadeUp, popIn } from "@/styles/motion.css";
import * as styles from "./State.css";

export function Spinner({ label }: { label?: string }) {
  return (
    <div className={styles.center}>
      <span className={styles.spinner} />
      {label && <p className={styles.muted}>{label}</p>}
    </div>
  );
}

type EmptyStateProps = {
  icon: IconName;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className={`${styles.empty} ${fadeUp}`}>
      <span className={`${styles.emptyIcon} ${popIn}`}>
        <Icon name={icon} size={24} />
      </span>
      <h3 className={styles.emptyTitle}>{title}</h3>
      {description && <p className={styles.emptyDesc}>{description}</p>}
      {action && <div className={styles.emptyAction}>{action}</div>}
    </div>
  );
}

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Algo não carregou",
  description = "Tente de novo em instantes.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={`${styles.empty} ${fadeUp}`}>
      <span className={`${styles.emptyIcon} ${popIn}`} data-tone="danger">
        <Icon name="close" size={24} />
      </span>
      <h3 className={styles.emptyTitle}>{title}</h3>
      <p className={styles.emptyDesc}>{description}</p>
      {onRetry && (
        <button className={styles.retry} onClick={onRetry}>
          Tentar de novo
        </button>
      )}
    </div>
  );
}
