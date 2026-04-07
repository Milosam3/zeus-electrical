# Zeus Electrical — Lead Generation & Operations System

A full-stack prototype for Zeus Electrical Pty Ltd, a Johannesburg electrician business.
Built with Next.js 14 (App Router), Tailwind CSS, and Shadcn/UI.

## Features

| Route | Description |
|-------|-------------|
| `/` | Public website — hero, services, reviews, quote form |
| `/demo/whatsapp-bot` | AI WhatsApp intake bot simulator |
| `/demo/quote-bot` | AI auto-quote generator with PDF download |
| `/dashboard` | Owner ops dashboard with leads, job board & missed calls |

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Add your Anthropic API key

Edit `.env.local` and replace the placeholder:

```env
ANTHROPIC_API_KEY=sk-ant-...your-key-here...
```

Get a key at: https://console.anthropic.com/

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Anthropic API Usage

The app calls the Anthropic API (`claude-sonnet-4-20250514`) in 3 places:

1. **WhatsApp Bot** (`/api/whatsapp-chat`) — powers natural conversation, extracts structured lead data
2. **Quote Generator** (`/api/quote`) — generates professional electrical quote estimates
3. **Callback Scripts** (`/api/callback-script`) — writes personalised callback scripts for missed calls

All API calls have fallback UI — the app degrades gracefully if the API is unavailable.

## Brand

- **Company:** Zeus Electrical Pty Ltd
- **Owner:** Shaldon
- **Phone:** +27 60 790 2941
- **Area:** Roodepoort / Johannesburg West / Bryanston
- **Colours:** Deep blue `#0C2340` + Electric yellow `#F5C518`

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v3
- Shadcn/UI (Radix-based components)
- Anthropic SDK (`@anthropic-ai/sdk`)
- next-themes (dark/light mode)
- lucide-react icons

## Project Structure

```
src/
  app/
    page.tsx                    # Public website
    layout.tsx                  # Root layout with ThemeProvider + Navbar
    globals.css                 # Global styles + CSS variables
    api/
      whatsapp-chat/route.ts    # WhatsApp bot AI endpoint
      quote/route.ts            # Quote generation AI endpoint
      callback-script/route.ts  # Callback script AI endpoint
    demo/
      whatsapp-bot/page.tsx     # WhatsApp bot simulator UI
      quote-bot/page.tsx        # Quote generator UI
    dashboard/page.tsx          # Owner ops dashboard
  components/
    navbar.tsx                  # Navigation with dark mode toggle
    theme-provider.tsx          # next-themes provider
    ui/                         # Shadcn UI components (Radix-based)
```

## Notes

- No database required — mock data used for the prototype
- Mobile-first responsive design throughout
- Dark/light mode toggle in the navbar
- WhatsApp FAB button pinned bottom-right on the public site
