import type { HTMLAttributes, ElementType, ReactNode } from "react";
import { card } from "./Card.css";

type Pad = "none" | "md" | "lg";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  pad?: Pad;
  interactive?: boolean;
  children?: ReactNode;
};

export function Card({
  as: Tag = "div",
  pad = "lg",
  interactive,
  className,
  children,
  ...rest
}: CardProps) {
  const cls = card({ pad, interactive: interactive || undefined });
  return (
    <Tag className={className ? `${cls} ${className}` : cls} {...rest}>
      {children}
    </Tag>
  );
}
