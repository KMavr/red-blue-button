# redor.blue

[![CI](https://github.com/KMavr/red-blue-button/actions/workflows/ci.yml/badge.svg)](https://github.com/KMavr/red-blue-button/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A global social dilemma experiment. Every visitor makes one irreversible choice:

- **Red majority** → only those who chose red survive
- **Blue majority** → everyone survives

You can't communicate. You can't change your mind. One press. Forever.

**Live at [redor.blue](https://redor.blue)**

---

## How it works

```
User votes → POST /api/vote
  ├─ IP hashed (SHA-256 + salt) — raw IP never stored
  ├─ 24h dedup check via ip_log
  ├─ Vote inserted → get_results() RPC
  └─ Outcome derived client-side from current majority

/results polls GET /api/results every 5s
  └─ "survived" recalculated live — never persisted
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full design rationale.

---

## Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| Frontend   | React 19 + TypeScript + Vite         |
| Styling    | Tailwind CSS v4                      |
| Animations | Framer Motion                        |
| Routing    | React Router v7                      |
| i18n       | i18next (12 languages + RTL)         |
| Backend    | Vercel Serverless Functions (`/api`) |
| Database   | Supabase (PostgreSQL)                |
| Deployment | Vercel                               |

---

## Engineering highlights

- **Privacy-preserving dedup** — IPs are SHA-256 hashed with a salt before storage; no raw IPs ever touch the database. Votes are deduplicated via a 24h window on the hash.
- **Stateless serverless design** — each API function is fully self-contained; no shared in-memory state, no persistent process.
- **Real-time results without WebSockets** — results page polls `/api/results` every 5s with `stale-while-revalidate` cache headers; simple, reliable, zero infrastructure overhead.
- **12 languages + RTL** — browser language auto-detection via i18next; Arabic triggers full RTL layout through Tailwind's `rtl:` variants.
- **Outcome derived, not stored** — "survived/eliminated" is computed from live vote totals on each poll so it always reflects the current majority, not the majority at vote time.

---

## Local dev

**Prerequisites:** Node.js (see `.nvmrc`), a Supabase project, Vercel CLI.

```bash
npm install

# Copy and fill in your Supabase credentials
cp .env.example .env.local

npx vercel dev     # frontend + API routes on http://localhost:3000
```

`npm run dev` runs Vite only (no API routes — votes will fail).

---

## Scripts

| Command              | Description                     |
| -------------------- | ------------------------------- |
| `npm run dev`        | Vite dev server (frontend only) |
| `npx vercel dev`     | Full stack with API routes      |
| `npm run build`      | TypeScript check + Vite build   |
| `npm run lint`       | ESLint                          |
| `npm test`           | Vitest (single run)             |
| `npm run test:watch` | Vitest watch mode               |

---

## Environment variables

| Variable               | Description                         |
| ---------------------- | ----------------------------------- |
| `SUPABASE_URL`         | Your Supabase project URL           |
| `SUPABASE_SERVICE_KEY` | Service role key (server-side only) |
| `VITE_API_BASE`        | API base URL (empty for local dev)  |

Set these in `.env.local` for local development. On Vercel, set them via the dashboard or `vercel env add`.

---

## License

[MIT](LICENSE)
