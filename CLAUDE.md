# CLAUDE.md — redor.blue

## What This Is

A global social dilemma web app. Users choose Red or Blue: red majority kills everyone who picked blue, blue majority saves everyone. One vote per person (24h IP hash + cookie). Live results with country breakdown. Deployed at redor.blue.

## Tech Stack

- **React 19 + TypeScript + Vite** — frontend SPA
- **Tailwind CSS v4** — utility styling, no component library
- **Framer Motion** — vote button animations
- **React Router v7** — three routes: `/`, `/results`, `/privacy`
- **i18next** — 12 languages, auto-detected from browser
- **Supabase** — PostgreSQL via `@supabase/supabase-js` (service key, server-side only)
- **Vercel Serverless Functions** — `api/vote.ts` and `api/results.ts`

## Key Files

| File                           | Purpose                                                               |
| ------------------------------ | --------------------------------------------------------------------- |
| `api/vote.ts`                  | POST handler — IP dedup, vote insert, returns `{ survived, results }` |
| `api/results.ts`               | GET handler — aggregates totals + per-country breakdown               |
| `src/hooks/useVote.ts`         | Vote submission, cookie management, navigation                        |
| `src/hooks/useResults.ts`      | Polls `/api/results` every 5s; derives survival outcome               |
| `src/hooks/useLandingStats.ts` | Polls total count for landing page live ticker                        |
| `src/i18n/index.ts`            | i18next init with all 12 translation files                            |
| `src/types/index.ts`           | `Choice`, `Results`, `VoteResponse`, `CountryResult` types            |
| `translations/en.json`         | Source of truth for all translation keys                              |

## Supabase Tables

```
votes(id, choice, country, ip_hash, created_at)
ip_log(ip_hash, last_vote)   ← dedup: 24h window
```

Environment variables needed: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`.

## Styling Conventions

- All class strings go through `cn()` from `src/utils/cn.ts` (clsx + tailwind-merge)
- Styles are defined as `const styles = { ... }` objects at the bottom of each component file
- Color tokens: `text-red`, `text-blue`, `text-secondary`, `text-primary`, `bg-surface`, `border-line`
- RTL support via Tailwind `rtl:` variants (Arabic)
- No CSS modules, no styled-components

## Vote Logic

1. Landing page: `useVote` submits to `/api/vote`; on `429` (already voted) redirects directly to `/results`
2. `voted` cookie (1 day) — redirect gate
3. `last_choice` cookie (1 year) — remembers choice for outcome display on return visits
4. Results page polls every 5s and recalculates `survived` from live data

## i18n Keys

All keys are flat dot-separated strings in `translations/*.json`. Pattern: `<page>.<section>.<element>`. Always add new keys to all 12 translation files. English (`en.json`) is fallback.

## Local Dev

```bash
npm run dev          # Vite only (no API routes)
npx vercel dev       # Full stack with API routes
```

## Deployment

Vercel. Config in `vercel.json`: SPA rewrite (`/((?!api/).*) → /index.html`), image cache headers. Push to `main` auto-deploys.
