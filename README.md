# Oubble

Plataforma de prospecção: encontra empresas por nicho e cidade, pontua a
oportunidade, organiza o funil, gera o prompt do site de cada lead e dispara o
contato por email.

## Stack

- **Front:** Vite + React + TypeScript, estilos em Vanilla Extract (sem Tailwind)
- **Back:** Hono + SQLite nativo (`node:sqlite`) — banco em arquivo, nada se perde
- **Integrações:** Google Places, Serper, Resend

## Rodar

Precisa de Node 24+ e pnpm.

```bash
pnpm install
```

Crie o arquivo `.env` na raiz (veja `.env.example`):

```
GOOGLE_MAPS_API_KEY=...
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
SERPER_API_KEY=...
RESEND_API_KEY=...
FROM_EMAIL=...
```

Sobe tudo com um comando só:

```bash
pnpm dev
```

Isso liga a API (porta 8787) e a interface (porta 5173) juntas, com os logs
de cada uma no mesmo terminal. Abra `http://localhost:5173`.

## Onde ficam as coisas

```
server/        API Hono, banco SQLite, busca, scoring, email, gerador de prompt
src/app/       router e tema
src/components/ blocos de UI reaproveitáveis
src/features/  uma pasta por tela (home, search, clients, messages, settings...)
src/lib/       tipos, cliente de API, catálogo de nichos
src/styles/    tokens de design (cores em OKLCH, claro/escuro)
oubble.db      seu banco local (não vai pro git)
```

## Telas

- **Início** — números e últimos encontrados
- **Buscar** — acha empresas por nicho e cidade
- **Clientes** — funil em quadro, lista ou mapa; arrasta entre etapas
- **Buscas** — histórico de cada busca
- **Mensagens** — modelos de email por tom, com prévia
- **Ajustes** — sua assinatura e o peso de cada sinal de oportunidade
