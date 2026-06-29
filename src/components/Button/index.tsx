import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { button } from "./Button.css";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  children?: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  children,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  const cls = button({ variant, size });
  return (
    <button
      type={type}
      className={className ? `${cls} ${className}` : cls}
      {...rest}
    >
      {icon && <Icon name={icon} size={size === "lg" ? 20 : 18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "lg" ? 20 : 18} />}
    </button>
  );
}
