# Technology Stack

Verified from source on 15 Oct 2026. Evidence files: `package.json`,
`pnpm-lock.yaml`, `app/*`, `lib/supabase/server.ts`, `next.config.mjs`,
`tsconfig.json`, `components.json`, `.env.example`.

## Verified

| Layer | Choice | Version | Evidence |
|---|---|---|---|
| Framework | Next.js App Router (Turbopack) | 16.4.0 | `package.json`, build output |
| Language | TypeScript | 5.7.3 | `package.json`, `tsc --version` |
| UI runtime | React + React DOM | 19 | `package.json` |
| Component bases | Base UI React, shadcn (`base-nova`) | ^1.5.0 / ^4.11.0 | `package.json`, `components.json` |
| Styling | Tailwind CSS (+ PostCSS plugin), `tw-animate-css` | ^4.3.3 / ^1.4.0 | `package.json`, `postcss.config.mjs` |
| Icons | lucide-react | ^1.16.0 | `package.json`, `app/page.tsx` |
| Class helpers | clsx, tailwind-merge, class-variance-authority | — | `package.json`, `lib/utils.ts` |
| Analytics | @vercel/analytics (production only) | 1.6.1 | `package.json`, `app/layout.tsx:45` |
| Content backend | Supabase (Postgres + anon/publishable key via `@supabase/ssr`) | ^0.12.7 / ^2.117.3 | `package.json`, `lib/supabase/server.ts:1-25` |
| Env convention | `.env.local` (gitignored, incl. plain `.env`); names documented in `.env.example` | — | `.gitignore`, `.env.example` |
| Package manager | pnpm | 12.3.4 declared / 11.3.0 used locally | `package.json`, local env |
| Runtime (local) | Node.js | v24.15.0 | local env |

## Configuration observations

- `next.config.mjs`: `typescript.ignoreBuildErrors: true` and `images.unoptimized: true`.
  The first is a **release risk** (type errors can't fail the build); the second is
  consistent with a fully static export with local images.
- `tsconfig.json`: strict mode on; path alias `@/*`.
- Images are plain `<img>` tags over same-origin `public/` files — no remote image
  domains configured or needed.

## Not present (verified by search)

Authentication/session provider beyond SSR cookie plumbing · server actions,
middleware · test framework or CI workflow · logging,
monitoring, backup, deployment, or infrastructure config · lint config ·
Supabase migrations/policies in version control (only the UNAPPLIED proposal in
`supabase/migrations/`) · rate limiting on the content API.

## Consequence

The portal is no longer standalone: the home page and content API depend on a
Supabase project (env + RLS) at build and request time. Database, auth, AI, and
hosting choices beyond the read-only content surface still wait for
authoritative platform access and privacy review — no further dependencies
should be added speculatively. (Upstream-added `swr` was unused; removed from
`package.json` + `pnpm-lock.yaml`, consistency confirmed by pnpm's own lockfile
check during build — see `docs/testing-results.md`.)
