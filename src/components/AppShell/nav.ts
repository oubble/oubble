import type { IconName } from "@/components/Icon";

export type NavItem = {
  to: string;
  label: string;
  icon: IconName;
};

/** Primary navigation. Short, plain words — verbs and nouns from the daily job. */
export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Início", icon: "home" },
  { to: "/buscar", label: "Buscar", icon: "search" },
  { to: "/clientes", label: "Clientes", icon: "clients" },
  { to: "/historico", label: "Histórico", icon: "history" },
  { to: "/mensagens", label: "Mensagens", icon: "message" },
  { to: "/ajustes", label: "Ajustes", icon: "settings" },
];
