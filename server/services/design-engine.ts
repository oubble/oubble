import type { Lead } from "../../src/lib/types.ts";

/**
 * Generates a per-lead DESIGN.md following Google Stitch's semantic format.
 *
 * Two leads in the same niche must never get the same brief, yet the same lead
 * must be reproducible. We derive every creative choice from a deterministic
 * seed (lead id + name), so variation is real but stable.
 */

type NicheMood = {
  label: string;
  mood: string[];
  /** Candidate accent hues (oklch H) that fit the segment. */
  accentHues: number[];
  fonts: string[];
};

const NICHE_MOODS: Record<string, NicheMood> = {
  restaurante: { label: "Restaurante", mood: ["apetitoso", "caloroso", "fotográfico"], accentHues: [30, 25, 60], fonts: ["Fraunces", "Satoshi"] },
  barbearia: { label: "Barbearia", mood: ["masculino", "vintage", "contrastado"], accentHues: [40, 20, 90], fonts: ["Cabinet Grotesk", "Geist"] },
  "salao-beleza": { label: "Salão de beleza", mood: ["elegante", "suave", "feminino"], accentHues: [350, 320, 30], fonts: ["Editorial New", "Outfit"] },
  dentista: { label: "Dentista", mood: ["limpo", "confiável", "claro"], accentHues: [220, 200, 235], fonts: ["Geist", "Outfit"] },
  "clinica-estetica": { label: "Clínica de estética", mood: ["sofisticado", "luxuoso", "sereno"], accentHues: [320, 30, 270], fonts: ["Fraunces", "Satoshi"] },
  academia: { label: "Academia", mood: ["energético", "forte", "dinâmico"], accentHues: [25, 140, 90], fonts: ["Cabinet Grotesk", "Geist"] },
  petshop: { label: "Pet shop", mood: ["amigável", "lúdico", "acolhedor"], accentHues: [200, 140, 60], fonts: ["Outfit", "Satoshi"] },
  advocacia: { label: "Advocacia", mood: ["sóbrio", "institucional", "seguro"], accentHues: [250, 230, 220], fonts: ["Fraunces", "Geist"] },
  contabilidade: { label: "Contabilidade", mood: ["organizado", "preciso", "corporativo"], accentHues: [220, 200, 250], fonts: ["Geist", "Outfit"] },
  imobiliaria: { label: "Imobiliária", mood: ["aspiracional", "espaçoso", "premium"], accentHues: [140, 220, 40], fonts: ["Outfit", "Satoshi"] },
  oficina: { label: "Oficina mecânica", mood: ["robusto", "direto", "técnico"], accentHues: [40, 25, 230], fonts: ["Cabinet Grotesk", "Geist"] },
  padaria: { label: "Padaria", mood: ["artesanal", "aconchegante", "rústico"], accentHues: [40, 60, 30], fonts: ["Fraunces", "Outfit"] },
  "loja-roupas": { label: "Loja de roupas", mood: ["estiloso", "editorial", "moderno"], accentHues: [20, 320, 250], fonts: ["Editorial New", "Geist"] },
  "consultorio-medico": { label: "Consultório médico", mood: ["clínico", "calmo", "confiável"], accentHues: [200, 220, 160], fonts: ["Geist", "Outfit"] },
  arquitetura: { label: "Escritório de arquitetura", mood: ["minimalista", "autoral", "amplo"], accentHues: [40, 230, 20], fonts: ["Cabinet Grotesk", "Satoshi"] },
};

const DEFAULT_MOOD: NicheMood = {
  label: "Negócio local",
  mood: ["confiável", "moderno", "direto"],
  accentHues: [220, 200, 30],
  fonts: ["Geist", "Satoshi"],
};

const LAYOUTS = [
  "split-screen com a foto âncora à direita e a chamada à esquerda",
  "left-aligned com bloco de texto forte e prova social logo abaixo",
  "asymmetric com whitespace generoso e uma imagem grande deslocada",
  "editorial em zig-zag, alternando texto e imagem a cada seção",
];

const SECTION_POOLS = [
  ["Hero", "Prova de autoridade", "Serviços em destaque", "Depoimentos", "Contato direto"],
  ["Hero", "O problema que resolvemos", "Como funciona", "Galeria", "Chamada final"],
  ["Hero", "Diferenciais", "Serviços", "Localização e horários", "Contato direto"],
  ["Hero", "Sobre o negócio", "Portfólio visual", "Depoimentos", "Agendamento"],
];

/** Tiny deterministic hash → stable numeric seed from a string. */
function seedFrom(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: T[], seed: number, salt: number): T {
  return arr[(seed + salt) % arr.length]!;
}

function brandColorHint(lead: Lead): string {
  if (lead.hasWebsite && lead.website) {
    return `A empresa já tem site (${lead.website}). Extraia a logo, a paleta e a estrutura de seções do site atual e faça um redesign forte: mesma identidade reconhecível, execução muito superior. Mantenha as cores da marca como base e use o acento abaixo só para realce de ações.`;
  }
  return "A empresa não tem site. Você tem liberdade criativa guiada pelo clima do segmento abaixo. Crie uma identidade própria, mas coerente com o tipo de negócio e a cidade.";
}

export function generateDesignBrief(lead: Lead): { content: string; seed: string } {
  const niche = lead.niche ?? "";
  const mood = NICHE_MOODS[niche] ?? DEFAULT_MOOD;
  const seedNum = seedFrom(`${lead.id}:${lead.companyName}`);
  const seedHex = seedNum.toString(16);

  const layout = pick(LAYOUTS, seedNum, 1);
  const sections = pick(SECTION_POOLS, seedNum, 2);
  const accentHue = pick(mood.accentHues, seedNum, 3);
  const font = pick(mood.fonts, seedNum, 4);
  const variance = 4 + (seedNum % 5); // 4–8
  const accent = `oklch(0.62 0.17 ${accentHue})`;

  const city = lead.city ?? "a cidade do cliente";

  return {
    seed: seedHex,
    content: `# Design System: Site para ${lead.companyName}

> Brief único para este cliente. Semente de variação: ${seedHex}. Não reutilize este arquivo para outro lead.

## 0. Contexto do cliente
- Empresa: ${lead.companyName}
- Segmento: ${mood.label}
- Cidade: ${city}
- Site atual: ${lead.hasWebsite && lead.website ? lead.website : "não possui"}
- ${brandColorHint(lead)}

## 1. Atmosfera visual
Clima: ${mood.mood.join(", ")}. Variância ${variance}/10, motion 6/10, densidade 4/10.
Layout da hero: ${layout}.
A interface deve transmitir o clima do segmento sem cair em template genérico. Hero centralizada é proibida nesta variância.

## 2. Paleta e papéis
- Fundo Off-White (#F9FAFB) — superfície principal
- Superfície (#FFFFFF) — cartões e blocos
- Tinta Carvão (#18181B) — texto principal (nunca #000000)
- Aço Suave (#71717A) — texto secundário e metadados
- Borda Sussurro (rgba(226,232,240,0.6)) — linhas de 1px
- Acento (${accent}) — único acento, para ações e foco. Saturação contida, sem neon, sem roxo de IA.

## 3. Tipografia
- Display: ${font} — track-tight, hierarquia por peso e cor, não por tamanho gritante
- Corpo: ${font} — entrelinha relaxada, máximo 65 caracteres por linha, cor secundária
- Proibido: Inter, serifas genéricas, emojis.

## 4. Componentes
- Botões: chapados, sem glow, feedback tátil de -1px no clique. Um CTA primário por seção.
- Cartões: cantos generosos (2rem), sombra difusa tingida com o fundo. Só quando elevação tem função.
- Inputs: label acima, erro abaixo, foco no acento. Sem label flutuante.
- Loaders: esqueleto no formato do conteúdo, nunca spinner circular.
- Estados vazios: composição ilustrada que mostra como preencher.

## 5. Layout
- Seções nesta ordem: ${sections.join(" → ")}.
- Grid em CSS Grid, sem cálculo de porcentagem em flexbox.
- Contido em max-width de 1200px centralizado, com padding interno generoso.
- Nada de 3 cartões iguais lado a lado — use zig-zag ou grid assimétrico.
- Seções de altura cheia usam min-h-[100dvh], nunca h-screen.
- Elementos nunca se sobrepõem; cada um ocupa sua zona.

## 6. Motion
- Física de mola (stiffness 100, damping 20), sem easing linear.
- Revelações em cascata escalonada nas listas.
- Anime só transform e opacity.

## 7. Contrato técnico de saída (HTML — obrigatório)
- Entregue um único arquivo \`index.html\`, HTML5 semântico, sem framework, sem React.
- CSS embutido em uma tag \`<style>\` no \`<head>\`. Nada de CDN de framework.
- Use \`<header> <main> <section> <footer>\`, headings em ordem (um \`<h1>\`).
- Responsivo de verdade: abaixo de 768px tudo colapsa para uma coluna, sem scroll horizontal.
- Imagens com \`loading="lazy"\`, \`width/height\` definidos, e \`alt\` descritivo. Use picsum.photos como placeholder, nunca links quebrados.
- Toque mínimo de 44px em elementos interativos.
- Sem JavaScript a menos que essencial; se usar, inline e mínimo.
- O HTML precisa abrir sozinho no navegador, sem build.

## 8. Proibições (tells de IA)
Sem emojis, sem Inter, sem #000000, sem glow neon, sem gradiente em headline grande, sem 3 colunas iguais, sem nomes fake, sem clichês ("Eleve", "Seamless", "Unleash"), sem "role para explorar" nem setas saltitantes, sem cursores customizados, sem sobreposição de elementos.
`,
  };
}
