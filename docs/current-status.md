# Current Status

Audited 15 Oct 2026 at commit `74312ce` (branch `main`, in sync with
`origin/main`), plus local Supabase-surface fixes (uncommitted at audit time).
Repository root is a git checkout; remote is
`github.com/netspotmedia/oru-social-femtech-engineering`.

> This document is an audit finding, not a claim of clinical, privacy, security,
> or regulatory compliance.

## What exists and works

- **Home page** (`app/page.tsx` server component + `app/page-client.tsx`):
  approved Stitch v2 design with hero craft upgrade (display type, trust row,
  dotted motif, stats moved to domains, unified CTA), announcement bar, ORU
  Social emblem in header/footer/favicon. Guides render from Supabase
  (`getPublishedGuides`, published `article` rows, limit 12) with an explicit
  error notice when the content service is unreachable (`guidesFailed`).
- **Content API** (`app/api/content/route.ts`, `app/api/content/[slug]/route.ts`):
  published-only GET endpoints; invalid `type` → 400, missing slug → 404,
  service failure → 503. No auth (correct for public content if RLS holds).
- **Quality gates run:** see `docs/testing-results.md`.

## Feature matrix

| Capability | Status | Evidence / blocker |
|---|---|---|
| Women's Health portal UI | Partially operational | `app/page-client.tsx`; guides live, rest static |
| Health categories / search | Partially operational | Client-side filter; no content API |
| Guide cards | Partially operational | Supabase published rows; `body` line-convention mapping (see risks) |
| Content API | Partially operational | Published-only GETs; RLS unverified, no rate limits |
| Database | New dependency | Supabase via `@supabase/ssr`; RLS policy UNAPPLIED (`supabase/migrations/0001_*`) |
| Provider discovery | Blocked | No authorised provider data; UI entries are labelled mockups |
| AI navigation | Blocked | No sources, model, or safety review; UI is a static preview |
| EdTech registry / progress | Partially operational | Read-only published-content flow; no progress, no review workflow |
| Telehealth / booking | Not implemented | No capability to integrate with found |
| Admin / governance flows | Not implemented | No roles or admin routes |
| Auth / sessions / permissions | Not implemented | SSR cookie plumbing only; page and API are fully public |
| Tests / CI | Not implemented | Manual runs only; see `docs/testing-results.md` |
| Deployment config | Vercel (Hobby) behind GitHub `main` | Env vars in dashboard; Hobby deploys only commits authored by the connected Git account — see `deployment/README.md` |

## Risks (open)

1. **RLS unverified (highest).** Anon readability of `content_items` /
   `content_categories` depends on dashboard policies I cannot see. Proposal:
   `supabase/migrations/0001_content_public_read_policies.sql` (UNAPPLIED).
   Apply + run its verification queries before any production release.
2. Mockup figures (1,420+ specialists, guide counts, reviewer names, licence
   numbers) could be mistaken for verified data — mitigated only by in-UI labels.
   DB-sourced reviewer/reference strings come from the governed `body`-line
   convention (`lib/supabase/server.ts`); ungovemed rows must not ship.
3. `typescript.ignoreBuildErrors: true` lets type errors ship silently.
4. No dependency scanning, security headers, rate limits, or CI.
5. POPIA/legal review of Supabase hosting region, analytics, and any future AI
   data flows unconfirmed. Guide `image_url` values may introduce third-party
   requests (page uses plain `<img>`, no remote allowlist by design).
6. Stale-claim risk if clinical copy (DB or static) is edited without a review owner.

## Deliberately absent / blocked (pending owner decisions)

`LICENSE` (licence unchosen), `CONTRIBUTING.md` (policy unconfirmed),
`tests/`+`deployment/` scaffolding, backend writes/auth/AI integrations
(blocked per above), RLS application (needs Supabase access).

## Change log

- 2026-10-15: Docs refresh — all `.md` brought to `f10a96c`: Supabase-surface
  status, Vercel (Hobby) deployment target + single-committer rule, new
  `deployment/README.md`; `AGENTS.md` (Next.js-generated) and the master
  engineering prompt intentionally untouched.
- 2026-10-15: Supabase-surface fixes — failure-aware queries (503 + error
  notice instead of silent placeholder), `.env.example`, `.gitignore` covers
  plain `.env`, removed dead `components/portal-client.tsx`, dropped unused
  `swr`, non-attributive fallbacks, conditional image-credit caption, RLS
  proposal, docs refresh.
- 2026-10-15: Upstream Supabase content API foundation (`74312ce`) — audited,
  findings above.
- 2026-10-15: Full refresh — replaced stale v0-placeholder audit with v2 verification.
- 2026-10-14: Initial audit of the v0 shell (superseded).
