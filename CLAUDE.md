# Zeus Electrical — Project Context

## What It Is
Public marketing website for Zeus Electrical Pty Ltd, Johannesburg electrician business.
Started as a Fiksr prospecting demo; **Shaldon confirmed 2026-09-08 he wants it as his real
site.** Now a config-driven client site.

Change log: **`CHANGELOG.md`** (newest first).

## Stack
- **Frontend:** Next.js 14 (App Router), Tailwind CSS, shadcn/ui
- **Config-driven:** every per-client value lives in `src/client.config.ts` — business details,
  `theme` colours, trust badges, section subtitles, services, reviews, areas. Brand colours are
  injected as CSS variables (`--brand-primary` / `--brand-accent`) in `layout.tsx` and used
  throughout `page.tsx` / `navbar.tsx` instead of hardcoded hex.
- **AI:** Anthropic API (claude-sonnet) — only used by the `/demo/*` and `/dashboard` routes.
- **Hosting:** Vercel, project `zeus-electrical` (scope `milosam3s-projects`). Production alias
  **`https://zeus-electrical.vercel.app`** — the link to share. Deploy from a real terminal:
  `cd ~/Projects/zeus-electrical && npx vercel --prod --yes`. Per-deployment URLs
  (`zeus-electrical-<hash>-milosam3s-projects.vercel.app`) are auth-protected — never share them.
- **Status:** Live. `master` = production. Real domain (e.g. `zeuselectrical.co.za`) still to be
  pointed at the project.

## Routes
| Route | Description |
|---|---|
| `/` | Public website — hero, services, reviews, WhatsApp CTA. **Only linked route.** |
| `/demo/whatsapp-bot` | WhatsApp intake bot simulator — unlinked Fiksr-demo leftover |
| `/dashboard` | Owner ops dashboard — unlinked Fiksr-demo leftover |

(`/demo/quote-bot` was removed pre-2026-09-08. The demo routes above are no longer linked from
the site — reachable only by typing the URL. Delete if/when you want them gone.)

## Setup
```bash
npm install
# add ANTHROPIC_API_KEY to .env.local
npm run dev
```
Note: node_modules deleted when archived — run `npm install` first.

## Status
- Live client site, deployed to production, `master` in sync
- Config-driven — a new trades client is a copy of the repo + a new `client.config.ts`

## Dev Rules
- Branch → named branch, never commit to main directly
- Mock first, then build real
- Plan mode first on non-trivial features
