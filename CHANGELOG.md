# Changelog

Running log of changes to the Zeus Electrical site. Newest first.

## 2026-09-08

**Client status:** Shaldon confirmed he wants the website done — moving from prototype to real client site.

### Deployed to production (`https://zeus-electrical.vercel.app`)

- **Made the site fully config-driven** (`4a1072c`)
  - Theme colours (navy `#0C2340` / gold `#F5C518`), trust badges and the Services / Reviews / Areas section subtitles moved into `src/client.config.ts`.
  - Brand colours now injected as CSS variables (`--brand-primary`, `--brand-accent`) in `layout.tsx` and referenced throughout `page.tsx` / `navbar.tsx` instead of hardcoded hex.
  - Added service icons for fibre / handyman / painting so the same template fits non-electrical trades.
  - No visible change to Zeus — same palette, same copy. Purpose: next client is just a config file.
- **Removed Fiksr demo links from nav + footer** (`5e029db`)
  - Navbar: dropped **Dashboard** and **WhatsApp Bot** (desktop and mobile menu).
  - Footer → *Powered by*: dropped **WhatsApp Bot Demo** and **Owner Dashboard**. The **Fiksr** link stays.
- **Removed Fiksr demo cards from the homepage** (`8a6e9fe`)
  - The green *WhatsApp Bot Demo* and gold *Owner Dashboard* cards under "Our Services" are gone, plus the now-unused `next/link` import.

Merged to `master` via PR #1 (fast-forward). `master` = production.

### Notes / diagnosis

- **"Vercel link not working"** — Shaldon had been sent a per-deployment URL (e.g. `zeus-electrical-xxxxx-milosam3s-projects.vercel.app`). Those are protected by Vercel Authentication and bounce visitors to a Vercel login page. The correct public URL to share is **`https://zeus-electrical.vercel.app`** (the production alias).
- `/dashboard` and `/demo/whatsapp-bot` pages still exist in the app but are no longer linked from anywhere — only reachable by typing the URL. Left in place; delete if desired.
- `/demo/quote-bot` was already removed in `5c4c81a` (pre-2026-09-08).

### Still open

- Point a real domain (e.g. `zeuselectrical.co.za`) at the Vercel project instead of using the `.vercel.app` address.
- Decide whether to delete the unused `/dashboard` and `/demo/*` routes.
