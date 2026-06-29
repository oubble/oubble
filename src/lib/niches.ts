/**
 * Niche catalog. Each entry carries a design direction used later by the
 * DESIGN.md engine, so the site prompt feels native to the segment instead of
 * generic. Labels are pt-BR; ids stay stable for storage.
 */

export type Niche = {
  id: string;
  label: string;
  /** Design seed: mood words that steer layout, color and tone per segment. */
  mood: string[];
};

export const NICHES: Niche[] = [
  { id: "restaurante", label: "Restaurante", mood: ["apetitoso", "caloroso", "fotográfico"] },
  { id: "barbearia", label: "Barbearia", mood: ["masculino", "vintage", "contrastado"] },
  { id: "salao-beleza", label: "Salão de beleza", mood: ["elegante", "suave", "feminino"] },
  { id: "dentista", label: "Dentista", mood: ["limpo", "confiável", "claro"] },
  { id: "clinica-estetica", label: "Clínica de estética", mood: ["sofisticado", "luxuoso", "sereno"] },
  { id: "academia", label: "Academia", mood: ["energético", "forte", "dinâmico"] },
  { id: "petshop", label: "Pet shop", mood: ["amigável", "lúdico", "acolhedor"] },
  { id: "advocacia", label: "Advocacia", mood: ["sóbrio", "institucional", "seguro"] },
  { id: "contabilidade", label: "Contabilidade", mood: ["organizado", "preciso", "corporativo"] },
  { id: "imobiliaria", label: "Imobiliária", mood: ["aspiracional", "espaçoso", "premium"] },
  { id: "oficina", label: "Oficina mecânica", mood: ["robusto", "direto", "técnico"] },
  { id: "padaria", label: "Padaria", mood: ["artesanal", "aconchegante", "rústico"] },
  { id: "loja-roupas", label: "Loja de roupas", mood: ["estiloso", "editorial", "moderno"] },
  { id: "consultorio-medico", label: "Consultório médico", mood: ["clínico", "calmo", "confiável"] },
  { id: "arquitetura", label: "Escritório de arquitetura", mood: ["minimalista", "autoral", "amplo"] },
];

export function findNiche(query: string): Niche | undefined {
  const q = query.trim().toLowerCase();
  return NICHES.find((n) => n.label.toLowerCase() === q || n.id === q);
}
