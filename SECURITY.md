# Security Policy

## Scope

This repository is a Next.js application with a **read-only Supabase content
surface** (published guides) plus the static portal page. It has:

- API routes: `GET /api/content`, `GET /api/content/:slug` (published rows only)
- Server-side Supabase reads via the publishable/anon key (public by design)
- No database writes from the app, no persistence of user data
- No authentication, sessions, tokens, or user accounts
- No handling, storage, or transmission of personal or health data
- No secrets in code (env var names only; values live in `.env.local`, gitignored —
  see `docs/testing-results.md`)

Row-level security on `content_items` / `content_categories` must grant anon
reads of published rows only. Policy proposal:
`supabase/migrations/0001_content_public_read_policies.sql` (UNAPPLIED —
verify in the Supabase dashboard before any production release).

## Reporting a vulnerability

Do not open a public issue for security vulnerabilities.

Contact the technical lead (Abayomi Okemakinde) or the project owner
(Florida N. Mpengesi, Online Riches Unleashed (Pty) Ltd) directly with:

1. A description of the issue and its potential impact
2. Steps to reproduce
3. The commit SHA and environment you tested against

We will acknowledge receipt, assess, and coordinate a fix and disclosure timeline.

## Known security posture (honest assessment, not a certification)

| Area | State |
|---|---|
| Secrets management | Env values in `.env.local` (gitignored, incl. plain `.env`); repo holds names only (`.env.example`); no values committed |
| Authentication / authorisation | Not implemented — the page is fully public |
| Input handling | Guides search/filter stays client-side; `type` query param allow-listed (`isContentType`), slug via parameterized Supabase query; RLS proposal unapplied — see risks |
| Dependencies | Pinned via `pnpm-lock.yaml`; unused `swr` removed (consistency confirmed by pnpm lockfile check — see testing results); no audit/SCA workflow yet — recommended before release |
| Type safety gate | `next.config.mjs` sets `typescript.ignoreBuildErrors: true` — builds succeed even with type errors; must be removed before any production release |
| Security headers / CSP | Not configured — to be set at the hosting layer |
| Analytics | `@vercel/analytics` renders in production only; collects no health data by itself |

## Before any production release

1. Remove `typescript.ignoreBuildErrors` and gate releases on `tsc --noEmit`.
2. Add dependency scanning and a lockfile audit step to CI.
3. Configure security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy) at the host.
4. Complete the privacy/legal review in `docs/privacy-and-safety.md` (including POPIA).
5. If authentication, forms, or any data collection are added, conduct a threat-model
   review first — the current policy assumes a read-only published-content surface.
6. Apply and verify the RLS policy (`supabase/migrations/0001_*`) so the anon key
   reaches published rows only; set Supabase env vars in the Vercel dashboard
   (all environments), never in code — see `deployment/README.md`.
