import { digitGroup, digit } from "@/styles/motion.css";

type PopNumberProps = {
  value: number | string;
  className?: string;
};

export function PopNumber({ value, className }: PopNumberProps) {
  const chars = String(value).split("");
  return (
    <span className={className ? `${digitGroup} ${className}` : digitGroup} key={String(value)}>
      {chars.map((ch, i) => {
        const fromEnd = chars.length - 1 - i;
        const stagger = fromEnd === 1 ? "1" : fromEnd === 0 ? "2" : undefined;
        return (
          <span key={i} className={digit} data-stagger={stagger}>
            {ch}
          </span>
        );
      })}
    </span>
  );
}
