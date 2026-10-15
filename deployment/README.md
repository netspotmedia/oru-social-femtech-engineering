# Deployment

Target: **Vercel (Hobby)** behind GitHub `main`
(`github.com/netspotmedia/oru-social-femtech-engineering`).

## Environment variables (dashboard only, never in code)

Set in the Vercel dashboard for **all environments** (Production, Preview,
Development):

| Name | Value source |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard → project settings |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase dashboard (or legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY`) |

Local development uses `.env.local` (see `.env.example`; gitignored).
Without these vars the home page renders an explicit "could not be loaded"
notice in the guides section instead of failing.

## Hobby single-committer rule (learned 15 Oct 2026)

Vercel Hobby deploys only commits whose author maps to a Git account on the
team. A commit authored with any other email is blocked with "couldn't find a
Git account for the commit author". No upgrade is needed as long as:

1. Every commit pushed to `main` uses the connected GitHub account's
   **verified email** as author email:
   `git config user.email "netspotsmedia@gmail.com"`.
2. If a deploy is blocked anyway, the project owner pushes any commit
   (even `git commit --allow-empty`) or hits Redeploy in the dashboard.

## Rollback

Vercel keeps every deployment: dashboard → Deployments → select the last
known-good build → Promote to Production. Code rollback is a standard
`git revert` + push (authored with the correct email per above).

## Pre-production checklist

1. RLS policy applied and verified (`supabase/migrations/0001_*` + its queries).
2. `typescript.ignoreBuildErrors` removed; `tsc --noEmit` green.
3. Security headers set at the host (CSP, HSTS, X-Content-Type-Options,
   Referrer-Policy) — see `SECURITY.md`.
4. POPIA/legal review complete — see `docs/privacy-and-safety.md`.
