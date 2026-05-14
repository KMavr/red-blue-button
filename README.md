# redor.blue

A global social dilemma experiment. Every visitor chooses: press **Red** or press **Blue**.

- **Red majority** → only those who pressed red survive
- **Blue majority** → everyone survives

You can't communicate. You can't change your mind. One press. Forever.

Live at **[redor.blue](https://redor.blue)**.

---

## Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| Frontend   | React 19 + TypeScript + Vite         |
| Styling    | Tailwind CSS v4                      |
| Animations | Framer Motion                        |
| Routing    | React Router v7                      |
| i18n       | i18next (12 languages)               |
| Backend    | Vercel Serverless Functions (`/api`) |
| Database   | Supabase (PostgreSQL)                |
| Deployment | Vercel                               |

## Highlights

- **Privacy-preserving dedup** — IPs are SHA-256 hashed with a salt before storage; no raw IPs ever touch the database. Votes are deduplicated via a 24h window on the hash.
- **Stateless serverless design** — each API function is fully self-contained; no shared in-memory state, no server process to manage.
- **Real-time results without WebSockets** — results page polls `/api/results` every 5s; simple, reliable, zero infra overhead.
- **12 languages + RTL** — browser language auto-detection via i18next; Arabic triggers full RTL layout through Tailwind's `rtl:` variants.
- **Outcome derived client-side** — "survived/eliminated" status is computed from live vote totals on each poll, not stored, so it always reflects current reality.

## Local Dev

```bash
npm install
npx vercel dev     # frontend + API routes together
```
