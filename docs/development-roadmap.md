# Development Roadmap

## Stage A — Audit (done, 15 Oct 2026)

Repository, manifests, routes, config, and absence of backend/auth/data/test
systems verified and recorded in `docs/current-status.md`. Evidence in
`docs/testing-results.md`.

## Stage B — Design (done for home page)

Stitch v2 home page implemented and screenshot-verified against
`screen.png`. Remaining design work (provider detail, guide detail, AI
interaction, admin screens) is out of scope until data sources exist.

## Stage C — Approval checkpoint (open)

1. Licence choice (`LICENSE`) and contribution policy (`CONTRIBUTING.md`).
2. Authoritative ORU Social repo/API/database access — or confirmation this stays standalone.
3. Approved content/source registry + named clinical review owner.
4. Provider data owner, verification evidence, jurisdiction scope.
5. AI: keep disabled vs deterministic test adapter vs approved vendor (with privacy sign-off).
6. POPIA/legal review owner and retention policy.
7. Hosting target: Vercel (Hobby) behind GitHub `main` — decided; see
   `deployment/README.md` for env vars and the single-committer Hobby rule.
8. Approval to add database, auth, test framework, and CI (plus removing `ignoreBuildErrors`).

## Stage D — Implementation order (after approvals)

1. Docs/CI foundations: type gate (remove `ignoreBuildErrors`), lint, test runner,
   dependency scanning. (Env convention `.env.example` + RLS proposal done.)
2. Approved resource/category read flow — **read side implemented**
   (server-validated published-only queries, bounded limits, 503 on failure);
   still needs RLS applied + rate limits + pagination if the library grows.
3. Real provider search/profile flow once the source is verified.
4. Existing booking/consultation handoff only — no duplicate telehealth system.
5. Bounded AI navigation only after sources, model/privacy review, safety policy,
   validated citations, reporting, and rate limits.
6. Restricted governance workflows if required.

## Stage E — Verification (ongoing)

Current evidence: `docs/testing-results.md`. Target before any release: automated
unit/integration/E2E, accessibility checks, security tests, slow-network checks,
and the full synthetic user journey — all recorded with commands and results.

## Stage F — Handover

Per-release: files changed, migrations/rollback, environment names (never values),
test evidence, deployment steps, known limitations, residual risks, next tasks.

## Effort estimate

Not estimable from the prototype alone — depends on authoritative interfaces, data
readiness, privacy review, and whether auth/provider/AI services already exist.
Estimate after Stage C inputs arrive.
