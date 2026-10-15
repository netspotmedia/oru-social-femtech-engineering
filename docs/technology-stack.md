# Technology Stack

Verified from source on 15 Oct 2026. Evidence files: `package.json`,
`pnpm-lock.yaml`, `app/*`, `next.config.mjs`, `tsconfig.json`, `components.json`.

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

Database client/ORM, schema, migrations, seed data · authentication/session provider ·
API routes, server actions, middleware · test framework or CI workflow · logging,
monitoring, backup, deployment, or infrastructure config · lint config.

## Consequence

This is a standalone front-end prototype shell, not an integrated ORU Social
application. Database, auth, AI, and hosting choices must wait for authoritative
platform access and privacy review — no dependencies should be added speculatively.
