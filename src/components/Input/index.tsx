import type { InputHTMLAttributes } from "react";
import { input } from "./Input.css";

type Size = "md" | "lg";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputSize?: Size;
};

export function Input({ inputSize = "md", className, ...rest }: InputProps) {
  const cls = input({ size: inputSize });
  return <input className={className ? `${cls} ${className}` : cls} {...rest} />;
}
