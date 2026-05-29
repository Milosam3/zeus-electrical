# Zeus Electrical — Project Context

## What It Is
Lead generation and operations prototype for Zeus Electrical Pty Ltd, Johannesburg electrician business.
Built as a Fiksr pilot — first client to validate onboarding flow.

## Stack
- **Frontend:** Next.js 14 (App Router), Tailwind CSS, shadcn/ui
- **AI:** Anthropic API (claude-sonnet)
- **Status:** Prototype, awaiting client confirmation to go live

## Routes
| Route | Description |
|---|---|
| `/` | Public website — hero, services, reviews, quote form |
| `/demo/whatsapp-bot` | AI WhatsApp intake bot simulator |
| `/demo/quote-bot` | AI auto-quote generator with PDF download |
| `/dashboard` | Owner ops dashboard — leads, job board, missed calls |

## Setup
```bash
npm install
# add ANTHROPIC_API_KEY to .env.local
npm run dev
```
Note: node_modules deleted when archived — run `npm install` first.

## Status
- Prototype complete
- Pending Zeus Electrical sign-off to use as live Fiksr pilot

## Dev Rules
- Branch → named branch, never commit to main directly
- Mock first, then build real
- Plan mode first on non-trivial features
