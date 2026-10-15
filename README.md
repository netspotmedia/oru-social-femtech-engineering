# ORU Social FemTech — Women's Health Portal

Accessible, clinically-reviewed women's health education and care navigation for South Africa, built as a Next.js prototype.

**Owner:** Florida N. Mpengesi, Founder and CEO — Online Riches Unleashed (Pty) Ltd, trading as ORU Social
**Technical lead:** Abayomi Okemakinde

> **Prototype status.** Guide cards load live from Supabase (published rows only);
> the rest is illustrative front-end content. There is no authentication, booking
> system, or live AI model. Provider names, licence numbers, statistics, and
> availability shown in the UI come from the Stitch design mockup and are labelled
> as illustrative in the interface. DB-sourced reviewer/reference strings follow
> the governed `body`-line convention.
> See `docs/current-status.md` and `docs/privacy-and-safety.md`.

## What is implemented

A Women's Health portal (server `app/page.tsx` + client `app/page-client.tsx`)
following the approved Stitch design (v2):

- Sticky header with section navigation and mobile menu
- Centered hero with working topic search and popular-topic shortcuts
- 9 clinical domains with life-stage filter (All / Reproductive / Perinatal / Mature)
- Clinical guide cards sourced live from Supabase (published-only) with an
  explicit error state when the service is unreachable; local photos
  (Wikimedia Commons, attributed) back the fallback card
- AI triage sandbox **preview** (static illustration — not connected to any model)
- Provider directory **preview** (mockup entries, labelled illustrative)
- Clinical Governance Charter, footer with SA emergency numbers and clinical disclaimer

## Tech stack

Next.js 16.4.0 (App Router, Turbopack) · React 19 · TypeScript 5.7.3 ·
Tailwind CSS 4 · shadcn/Base UI · lucide-react · Supabase (published content reads) · pnpm.
Full detail: `docs/technology-stack.md`. Architecture: `docs/system-architecture.md`.

## Getting started

Requirements: Node.js 24+, pnpm, Supabase project access (for content reads).

```powershell
pnpm install
Copy-Item .env.example .env.local   # fill in Supabase values (never commit them)
pnpm dev      # http://localhost:3000
pnpm build    # production build — requires the Supabase env vars above
pnpm start    # serve the production build
```

No other external services are required. Builds and the home page query
Supabase at request/build time; without env vars the guides section renders
an explicit "could not be loaded" notice instead of failing silently.

## Repository layout

```
app/                  # App Router: page.tsx (server, fetches guides), page-client.tsx,
                      # layout.tsx, globals.css, api/content/ (published-content GET endpoints)
components/ui/        # shadcn button (currently unused by the page)
lib/supabase/         # server client + published-content queries and card mapping
supabase/migrations/  # RLS policy proposal (UNAPPLIED — see docs/current-status.md)
public/               # icons, oru-social-logo.png, guides/ (fallback photos)
docs/                 # status, stack, architecture, roadmap, privacy, testing evidence
```

## Verification

```powershell
pnpm exec tsc --noEmit   # type check — must pass (exit 0)
pnpm build               # production build — requires Supabase env vars
```

Evidence and screenshot verification: `docs/testing-results.md`.

## Deployment

Vercel (Hobby) behind GitHub `main`. Required dashboard env vars and the
single-committer Hobby rule are documented in `deployment/README.md`.

## Known limitations

- Guide content comes from Supabase published rows; the `body`-line
  reviewer/reference convention needs governance (no approved content registry yet).
- No authentication, roles, or admin workflows exist; the RLS policy is proposed
  but unapplied — see `docs/current-status.md`.
- `next.config.mjs` sets `typescript.ignoreBuildErrors: true` — see `docs/current-status.md`.
- No licence selected yet (`LICENSE` intentionally absent); no contribution policy yet
  (`CONTRIBUTING.md` intentionally absent) — pending owner decisions.

Further reading: `docs/project-overview.md`, `docs/development-roadmap.md`, `SECURITY.md`.
