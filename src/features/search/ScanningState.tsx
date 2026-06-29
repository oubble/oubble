import { useEffect, useState } from "react";
import * as styles from "./SearchPage.css";

const STEPS = [
  "Procurando empresas",
  "Lendo a presença digital de cada uma",
  "Marcando as melhores oportunidades",
];

/**
 * The scan is a single backend call, so we can't stream real progress. We show
 * honest, sequential steps that reflect what the server is actually doing.
 */
export function ScanningState({
  niche,
  location,
}: {
  niche: string;
  location: string;
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.scanning}>
      <span className={styles.scanRing} />
      <h2 className={styles.scanTitle}>
        Buscando {niche.trim().toLowerCase()} em {location.trim()}
      </h2>
      <ul className={styles.scanSteps}>
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={styles.scanStep}
            data-state={i < step ? "done" : i === step ? "active" : "idle"}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
