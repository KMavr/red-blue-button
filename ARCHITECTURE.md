# Architecture

## Overview

redor.blue is a stateless, serverless social experiment. The frontend is a React SPA; the backend is two Vercel Serverless Functions backed by a Supabase PostgreSQL database. There is no persistent server process.

```
Browser
  │
  ├─ GET /                → React SPA (Vite build, static CDN)
  ├─ POST /api/vote       → Vercel Function (vote.ts)
  └─ GET /api/results     → Vercel Function (results.ts)
                                     │
                              Supabase PostgreSQL
                              ┌──────────────────┐
                              │ votes            │
                              │ ip_log           │
                              │ get_results()    │ ← PostgreSQL RPC
                              └──────────────────┘
```

## Vote flow

```
1. User presses Red or Blue
2. POST /api/vote { choice }
3. Server extracts IP from x-forwarded-for
4. IP → SHA-256(ip + "salt-rbb") → ip_hash  ← raw IP never stored
5. Check ip_log: last_vote within 24h? → 429 Already voted
6. INSERT into votes(choice, country, ip_hash)
7. UPSERT ip_log(ip_hash, last_vote = now)
8. CALL get_results() → { red, blue, countries[] }
9. Derive survived client-side from current majority
10. Return { survived, results } → navigate to /results
```

Key decisions:

- **Salted SHA-256 hash** — hashing makes stored values one-way and unlinkable across sites; the salt prevents rainbow-table lookups.
- **24h window on ip_log, not a unique constraint on votes** — allows the schema to accommodate future per-vote metadata without coupling dedup logic to the votes table itself.
- **Outcome not stored** — `survived` is derived from live totals on every poll. There is no `survived` column. This means the answer updates as votes come in, which is the point.

## Results flow

```
/results page loads
  │
  ├─ Immediate render from navigation state (no flash)
  └─ setInterval(fetchResults, 5000)
       │
       GET /api/results
         │
         supabase.rpc('get_results')   ← single DB call (PostgreSQL function)
         │
         Returns { red, blue, total, redPct, bluePct, countries[] }
         │
       Client derives majority = blue >= red ? 'blue' : 'red'
       Client derives survived = deriveSurvived(majority, userChoice)
```

Key decisions:

- **Polling over WebSockets** — at low-to-medium scale, 5s polling is simpler to operate, costs nothing extra, and survives Vercel's stateless function model with no changes. WebSockets would require a persistent connection layer (e.g. Ably, Pusher) that adds cost and a new failure mode.
- **PostgreSQL RPC for aggregation** — `get_results()` runs a single `GROUP BY` query in the database, returning pre-aggregated totals. This avoids fetching raw rows to the function and keeps the API response small regardless of vote volume.
- **CDN cache header on results** — `s-maxage=5, stale-while-revalidate=10` lets Vercel's edge serve cached results to burst traffic without hitting the database on every request.

## Dedup design

```
ip_hash (TEXT) ← SHA-256(raw_ip + salt)  stored in both votes and ip_log
ip_log.last_vote (TIMESTAMPTZ)           window check: now - 24h
```

Dedup is intentionally IP-based (not account-based) because:

1. No auth reduces friction to near-zero, which is essential for a social experiment
2. The 24h window prevents repeat voting without requiring registration
3. Hashing satisfies GDPR's data minimisation principle for IP addresses

## i18n + RTL

- `i18next-browser-languagedetector` reads `navigator.language`, falling back to `en`
- All 12 translation files are loaded at init (bundle size is acceptable at ~2KB gzipped per file)
- Arabic (`ar`) triggers RTL: the `<html dir="rtl">` attribute is set at runtime, and Tailwind's `rtl:` variants handle layout mirroring

## Supabase schema

```sql
CREATE TABLE votes (
  id         BIGSERIAL PRIMARY KEY,
  choice     TEXT NOT NULL CHECK (choice IN ('red', 'blue')),
  country    TEXT NOT NULL DEFAULT 'XX',
  ip_hash    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE ip_log (
  ip_hash   TEXT PRIMARY KEY,
  last_vote TIMESTAMPTZ NOT NULL
);

CREATE OR REPLACE FUNCTION get_results()
RETURNS JSON LANGUAGE plpgsql AS $$
DECLARE
  red_count   INT;
  blue_count  INT;
  countries   JSON;
BEGIN
  SELECT COUNT(*) FILTER (WHERE choice = 'red'),
         COUNT(*) FILTER (WHERE choice = 'blue')
  INTO red_count, blue_count
  FROM votes;

  SELECT json_agg(c) INTO countries FROM (
    SELECT country,
           COUNT(*) FILTER (WHERE choice = 'red')  AS red,
           COUNT(*) FILTER (WHERE choice = 'blue') AS blue,
           COUNT(*)                                 AS total
    FROM votes
    GROUP BY country
    ORDER BY total DESC
  ) c;

  RETURN json_build_object(
    'red',       red_count,
    'blue',      blue_count,
    'countries', COALESCE(countries, '[]'::json)
  );
END;
$$;
```
