import type { Stage, Temperature } from "@/lib/types";

/** Single source of truth for user-facing domain copy. All pt-BR. */

export const STAGE_LABEL: Record<Stage, string> = {
  found: "Encontrado",
  reviewing: "Avaliando",
  contacted: "Contatado",
  talking: "Em conversa",
  won: "Fechado",
  dropped: "Descartado",
};

/** Short helper line shown under each empty pipeline column. */
export const STAGE_HINT: Record<Stage, string> = {
  found: "Empresas que a busca trouxe agora",
  reviewing: "Você ainda está decidindo",
  contacted: "Já receberam sua mensagem",
  talking: "Responderam e estão conversando",
  won: "Viraram cliente",
  dropped: "Sem encaixe por enquanto",
};

export const TEMPERATURE_LABEL: Record<Temperature, string> = {
  hot: "Quente",
  warm: "Morno",
  cold: "Frio",
};

export const COUNTRY_LABEL: Record<string, string> = {
  BR: "Brasil",
  US: "Estados Unidos",
};
