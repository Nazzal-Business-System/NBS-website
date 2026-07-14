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

