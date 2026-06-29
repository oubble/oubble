import type { Temperature } from "@/lib/types";
import { TEMPERATURE_LABEL } from "@/lib/labels";
import { popIn } from "@/styles/motion.css";
import * as styles from "./ScoreBadge.css";

type ScoreBadgeProps = {
  score: number;
  temperature: Temperature;
  size?: "sm" | "lg";
};

/** Compact score chip. The dot carries the temperature color, number stays readable. */
export function ScoreBadge({ score, temperature, size = "sm" }: ScoreBadgeProps) {
  return (
    <span
      className={size === "lg" ? styles.badgeLg : styles.badge}
      data-temp={temperature}
      title={`${TEMPERATURE_LABEL[temperature]} · ${score} de 100`}
    >
      <span className={`${styles.dot} ${popIn}`} data-temp={temperature} />
      <span className={styles.value}>{score}</span>
    </span>
  );
}
