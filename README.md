# Nazzal Business Systems — Marketing Website

Official marketing site for **Nazzal Business Systems (NBS)**: an independent software studio operated by Ahmad Nazzal in Amman, Jordan. Bilingual (English / Arabic) product and consulting site for Innovation ERP, POS, inventory systems, and custom business software.

## Stack

- **Next.js 16** (App Router) — full-stack on Vercel (no separate Express/Render backend)
- **React 19** · **TypeScript** · **Tailwind CSS v4**
- **next-intl** (EN + AR, RTL)
- **Resend** via `src/app/api/contact` Route Handler (serverless)

## Development

```bash
cd nbs-website
npm install
# create .env.local from the Environment variables section below
npm run dev
```

- http://localhost:3000/en
- http://localhost:3000/ar

`/` redirects to the default locale.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Production server on port 3000 |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Environment variables

Create `nbs-website/.env.local` (gitignored). **Never commit secrets.**

### Public (`NEXT_PUBLIC_*` — exposed to the browser)

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Recommended for production | Canonical site URL (no trailing slash). Powers metadata, sitemap, Open Graph, and email logo absolute URLs. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional | E.164 digits only (no `+`). Enables WhatsApp CTAs when valid. |
| `NEXT_PUBLIC_BUSINESS_EMAIL` | Optional | Public business email (defaults to `nazzall.ahmed@gmail.com`). |
| `NEXT_PUBLIC_RESPONSE_SLA` | Optional | Response-time promise text where shown. |
| `NEXT_PUBLIC_PORTFOLIO_URL` | Optional | Founder portfolio link. Empty → “Portfolio Coming Soon” control. |
| `NEXT_PUBLIC_ERP_DEMO_URL` | Optional | Innovation ERP demo URL (hidden when empty). |
| `NEXT_PUBLIC_POS_DEMO_URL` | Optional | POS demo URL (hidden when empty). |
| `NEXT_PUBLIC_IMS_DEMO_URL` | Optional | Inventory demo URL (hidden when empty). |

### Server-only (never expose to the client)

| Variable | Required for contact form | Purpose |
|----------|---------------------------|---------|
| `RESEND_API_KEY` | **Yes** (to send) | Resend API key. Without it, the API returns a configuration error (does not fake success). |
| `CONTACT_FROM_EMAIL` | **Yes** (to send) | Verified Resend sender, e.g. `NBS <onboarding@resend.dev>` or a verified domain address. |
| `CONTACT_TO_EMAIL` | Optional | Inbox for inquiries (defaults to `NEXT_PUBLIC_BUSINESS_EMAIL` / `nazzall.ahmed@gmail.com`). |

### Contact API notes

- Handler: `POST /api/contact` (Next.js Route Handler, `nodejs` runtime — Vercel serverless compatible).
- In-memory rate limiting (5 requests / IP / 60s) is **best-effort only**. Each serverless isolate has its own map; it is not a durable global limiter.
- Localhost / `127.0.0.1` site URLs are never embedded as `<img>` sources in outbound email.

## Localization

- Locales: `en` (default), `ar`
- Routes: `/en/...`, `/ar/...`
- Messages: `src/messages/en.json`, `src/messages/ar.json`
- RTL: `dir="rtl"` on `<html>` for Arabic

## Deploying on Vercel

1. Import **`nbs-website`** as the project root (or set Root Directory to `nbs-website` if the monorepo root is the Git root).
2. Framework preset: **Next.js** (Build: `npm run build`, Output: Next defaults).
3. Set environment variables from the tables above in the Vercel project settings (Production + Preview as needed).
4. No Render, Express, or database service is required for this site.
5. Confirm `NEXT_PUBLIC_SITE_URL` matches the production domain (`https://…`).
6. Verify Resend domain / sender before relying on the contact form in production.

## Brand assets

Deployed copies live in `public/brand/`. Canonical sources are in the repository root `logo-transparent/` folder. Mapping: `src/config/brand-assets.ts`.

App icons: `src/app/favicon.ico`, `src/app/icon.png`, `src/app/apple-icon.png`.

## Boundaries

Do **not** modify these demo applications from this website project:

- `innovation-erp/`
- `pos-demo/`
- `ims-demo/`
