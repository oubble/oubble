import type { EmailTone } from "../../src/lib/types.ts";

/** Variables the user can drop into a template. Rendered before sending. */
export const TEMPLATE_VARS = [
  "empresa",
  "cidade",
  "site",
  "link_exemplo",
  "seu_nome",
  "seu_cargo",
] as const;

export type SeedTemplate = {
  name: string;
  tone: EmailTone;
  subject: string;
  body: string;
};

/**
 * Starter templates, one per tone. The pitch is always the same idea: I already
 * built a sample site for you, take a look. Tone changes how forward it is.
 */
export const SEED_TEMPLATES: SeedTemplate[] = [
  {
    name: "Direto ao ponto",
    tone: "direto",
    subject: "Fiz um site novo pra {{empresa}}, dá uma olhada",
    body: `Oi, time da {{empresa}}.

Reparei que vocês aparecem em {{cidade}} mas não achei um site à altura do trabalho de vocês. Em vez de mandar mais um email falando de proposta, resolvi fazer diferente: montei uma versão do site pra vocês verem como ficaria.

Tá aqui, sem compromisso nenhum: {{link_exemplo}}

Se gostar, a gente conversa e ajusta tudo do jeito de vocês. Se não rolar, o exemplo é de graça mesmo.

{{seu_nome}}
{{seu_cargo}}`,
  },
  {
    name: "Consultivo",
    tone: "consultivo",
    subject: "Uma ideia pra {{empresa}} aparecer melhor no Google",
    body: `Oi, tudo bem?

Encontrei a {{empresa}} pesquisando negócios em {{cidade}} e bateu uma vontade de mostrar uma coisa. Hoje, quando alguém procura por vocês, a primeira impressão online não conta a mesma história que o negócio de vocês conta pessoalmente. Isso custa cliente, todo dia, sem ninguém perceber.

Então fiz um exemplo de como essa primeira impressão poderia ser: {{link_exemplo}}

Não é uma cobrança nem um contrato. É só pra vocês verem com os próprios olhos o que dá pra fazer. Se fizer sentido, eu explico o resto numa conversa rápida.

{{seu_nome}}
{{seu_cargo}}`,
  },
  {
    name: "Ousado",
    tone: "ousado",
    subject: "{{empresa}}, eu já fiz o trabalho. Agora é com vocês",
    body: `Oi, time da {{empresa}}.

Vou ser honesto: eu não esperei vocês me contratarem pra começar. Peguei o que vocês têm em {{cidade}} e construí um site novo do zero, do jeito que eu acho que representa vocês de verdade.

Ele tá pronto, aqui: {{link_exemplo}}

Abre, navega, compara com o que vocês têm hoje. Se bater aquela sensação de "era isso que faltava", me responde que a gente coloca no ar pra valer. Se não bater, você passou três minutos vendo um site bonito e não perdeu nada.

A bola tá com vocês.

{{seu_nome}}
{{seu_cargo}}`,
  },
];

/** Replace {{var}} with values. Unknown vars become an empty string. */
export function renderTemplate(
  text: string,
  values: Record<string, string>,
): string {
  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key: string) =>
    values[key] ?? "",
  );
}
