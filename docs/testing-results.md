# Testing Results

No test framework or CI exists in this repo yet. All results below are from
manual runs on 15 Oct 2026 against commit `6e8a5ed` (Node v24.15.0, pnpm 11.3.0,
Windows). No test result is fabricated; failures and gaps are recorded as-is.

## Runs

| Check | Command | Result |
|---|---|---|
| Type check | `pnpm exec tsc --noEmit` | Pass (exit 0), TS 5.7.3 |
| Production build | `pnpm build` | Pass — `/` and `/_not-found` prerendered static |
| Secret scan | grep `app/` for `sk-`, `AKIA`, `api[_-]?key`, `password`, `secret`, `token` | No matches |
| Full-page visual | headless Chrome 1440px, `page.screenshot(fullPage)` vs Stitch v2 `screen.png` | Match section-for-section (see notes) |
| Guides section visual | element screenshot of `#guides` | All 3 photos render correctly |
| Image load assertion | `img.complete && naturalWidth > 0` for all `#guides img` | 3/3 pass (960, 960, 810px) |
| Filter behaviour | search + life-stage pills via page logic review | Domains filter/reset correctly; empty state with reset on no match |

## Visual-comparison notes

Deliberate, rules-driven deviations from the mockup: gradient-free real photos
(Wikimedia Commons, attributed) instead of unlicensed stock; provider/guide
figures labelled illustrative; decorative "View Availability" / "Flag
discrepancy" elements are non-focusable spans so they don't fake interactivity
to keyboard/screen-reader users.

## Not covered (gaps)

Unit/integration/E2E suites, accessibility runner (keyboard/SR/contrast audit),
slow-network and small-screen checks beyond responsive Tailwind classes, security
headers/CSP review, dependency audit. These are Stage D/E work once a test runner
and CI exist.

## 15 Oct 2026 — Supabase-surface runs (commit `74312ce` + local fixes)

Environment: Node v24.15.0, pnpm 11.3.0, Windows. No `.env*` files present;
Supabase-dependent checks used inline dummy env where noted.

| Check | Command | Result |
|---|---|---|
| Deps install | `pnpm install` | Pass (+12 pkgs; registry slow, ~3.5 min with retries) |
| Type check (pre-fix) | `tsc --noEmit` with stale `node_modules` | **Fail (expected)** — `Cannot find module '@supabase/ssr'`; deps were never installed after the upstream pull |
| Type check (post-fix) | `tsc --noEmit` | Pass (exit 0) |
| Lockfile surgery check | `pnpm build` (auto-verifies lockfile) | Pass — "Lockfile passes (407 entries), up to date"; pnpm pruned `swr` itself, confirming the manual `swr`+`dequal` removal is consistent |
| Production build (no real backend) | `pnpm build` with dummy `NEXT_PUBLIC_SUPABASE_URL` + key | Pass — `/` + both API routes correctly dynamic (`ƒ`); `cookies()` forces dynamic rendering, the init failure is caught, and the page prerenders the explicit error notice instead of 500 |
| `swr` removal | `pnpm remove swr` (×2) | **Blocked by registry flakiness** (`ERR_PNPM_BROKEN_METADATA_JSON` on unrelated `next@16.4.0` metadata); removed manually from `package.json` + `pnpm-lock.yaml` (importer, both package and snapshot entries; shared `use-sync-external-store`/`js-tokens` kept) and verified as above |
| RLS verification | Dashboard policies for anon on `content_items`/`content_categories` | **Not assessed** — no Supabase access from this environment; proposal + verification queries in `supabase/migrations/0001_*` (UNAPPLIED) |
| Secret scan | grep for `service_role`, key values, `password`, `secret` | No values in repo; env names only (`lib/supabase/server.ts:8-9`) |

Note: every `pnpm` invocation re-verifies the lockfile against supply-chain
policies over the network (~25s–3min on this connection) before running.

## Deployment note (Vercel Hobby, 15 Oct 2026)

Deployments were blocked with "couldn't find a Git account for the commit
author / Hobby teams do not support collaboration". Root cause: commits were
authored as `goldyomight-7002 <goldyomight@gmail.com>`, which maps to no Git
account on the Hobby team. Fixed without paying by aligning the repo author
email with the GitHub account's verified email (`netspotsmedia@gmail.com`)
and pushing a trigger commit (`f10a96c`). Rule going forward: every commit on
`main` must carry the connected account's email — see `deployment/README.md`.
