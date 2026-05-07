# redor.blue

A global social dilemma experiment. Every visitor chooses: press **Red** or press **Blue**.

- **Red majority** → only those who pressed red survive
- **Blue majority** → everyone survives

You can't communicate. You can't change your mind. One press. Forever.

Live at **redor.blue**.

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

## Project Structure

```
api/
  vote.ts          # POST /api/vote — records a vote, returns outcome
  results.ts       # GET /api/results — returns live vote totals + country breakdown

src/
  pages/
    LandingPage.tsx    # Main voting page with animated vote buttons
    ResultsPage.tsx    # Outcome + live results with country breakdown
    PrivacyPage.tsx    # Privacy policy

  components/
    VoteButton.tsx         # Red/Blue animated circular button
    ResultBar.tsx          # Horizontal split bar showing red/blue %
    CountryBreakdown.tsx   # Per-country results list
    LanguageSelector.tsx   # Language switcher

  hooks/
    useVote.ts          # Handles vote submission, duplicate detection via cookie
    useResults.ts       # Fetches and polls /api/results every 5s
    useLandingStats.ts  # Polls total vote count for landing page live ticker
    useShare.ts         # Share button with clipboard fallback

  i18n/index.ts      # i18next setup with browser language detection
  types/index.ts     # Shared TypeScript types (Choice, Results, VoteResponse)
  utils/
    cn.ts             # Tailwind class merge helper
    countryUtils.ts   # Country flag emoji + display name
    resultsUtils.ts   # Derive survived status from vote data

translations/        # JSON translation files (en, el, es, pt, fr, de, it, ja, ko, zh, ru, ar)
```

## How Voting Works

1. User lands on `/` and sees the dilemma with live vote count
2. Pressing a button calls `POST /api/vote` with `{ choice: "red" | "blue" }`
3. The API hashes the IP (SHA-256 + salt), checks `ip_log` for a vote within 24h, inserts into `votes`, and returns `{ survived, results }`
4. A `voted` cookie (1 day) and `last_choice` cookie (1 year) are set
5. User is redirected to `/results` with their outcome
6. Results page polls `/api/results` every 5s for live updates

## Duplicate Vote Prevention

- Server: IP hash checked against `ip_log` table (24h window)
- Client: `voted` cookie redirects repeat visitors straight to `/results`

## Environment Variables

```
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
```

Copy `.env.example` to `.env.local` for local development.

## Local Development

```bash
npm install
npm run dev        # starts Vite dev server at localhost:5173
```

For API routes to work locally you need the Vercel CLI:

```bash
npx vercel dev     # runs frontend + serverless functions together
```

## Commands

```bash
npm run dev        # dev server
npm run build      # TypeScript check + Vite build → dist/
npm run lint       # ESLint
npm run preview    # preview production build locally
```

## Supabase Schema

```sql
-- Votes table
create table votes (
  id bigint generated always as identity primary key,
  choice text not null check (choice in ('red', 'blue')),
  country text,
  ip_hash text,
  created_at timestamptz default now()
);

-- IP deduplication log
create table ip_log (
  ip_hash text primary key,
  last_vote timestamptz not null
);
```

## i18n

12 languages supported: English, Greek, Spanish, Portuguese, French, German, Italian, Japanese, Korean, Chinese, Russian, Arabic. Language is auto-detected from the browser and can be changed via the language selector. Arabic triggers RTL layout via Tailwind `rtl:` variants.
