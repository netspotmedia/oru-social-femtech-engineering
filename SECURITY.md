# Security Policy

## Scope

This repository is a **front-end prototype** (Next.js static page). It has:

- No backend, API routes, server actions, or middleware
- No database or persistence of any kind
- No authentication, sessions, tokens, or user accounts
- No handling, storage, or transmission of personal or health data
- No secrets in code (verified by scan — see `docs/testing-results.md`)

The attack surface is therefore limited to the static front-end itself and its
supply chain (npm dependencies, hosting layer).

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
| Secrets management | No secrets exist in this repo; none are needed to run it |
| Authentication / authorisation | Not implemented — the page is fully public |
| Input handling | One client-side search filter; no server input surface exists |
| Dependencies | Pinned via `pnpm-lock.yaml`; no audit/SCA workflow yet — recommended before release |
| Type safety gate | `next.config.mjs` sets `typescript.ignoreBuildErrors: true` — builds succeed even with type errors; must be removed before any production release |
| Security headers / CSP | Not configured — to be set at the hosting layer |
| Analytics | `@vercel/analytics` renders in production only; collects no health data by itself |

## Before any production release

1. Remove `typescript.ignoreBuildErrors` and gate releases on `tsc --noEmit`.
2. Add dependency scanning and a lockfile audit step to CI.
3. Configure security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy) at the host.
4. Complete the privacy/legal review in `docs/privacy-and-safety.md` (including POPIA).
5. If authentication, forms, or any data collection are added, conduct a threat-model
   review first — the current policy assumes a read-only static page.
