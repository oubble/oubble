import { useCallback, useEffect, type ReactNode } from "react";
import { ThemeContext } from "./theme-context";

/**
 * Dark mode desabilitado por enquanto: o app fica fixo no tema claro e o
 * toggle é um no-op. Para reativar, basta voltar a guardar o tema em estado
 * + localStorage e respeitar prefers-color-scheme.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.theme = "light";
  }, []);

  const toggle = useCallback(() => {}, []);

  return (
    <ThemeContext.Provider value={{ theme: "light", toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
