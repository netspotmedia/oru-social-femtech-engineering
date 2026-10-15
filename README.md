# ORU Social FemTech — Women's Health Portal

Accessible, clinically-reviewed women's health education and care navigation for South Africa, built as a Next.js prototype.

**Owner:** Florida N. Mpengesi, Founder and CEO — Online Riches Unleashed (Pty) Ltd, trading as ORU Social
**Technical lead:** Abayomi Okemakinde

> **Prototype status.** This is a front-end prototype with illustrative content.
> There is no backend, database, authentication, booking system, or live AI model.
> Provider names, licence numbers, statistics, and availability shown in the UI come
> from the Stitch design mockup and are labelled as illustrative in the interface.
> See `docs/current-status.md` and `docs/privacy-and-safety.md`.

## What is implemented

A single-page Women's Health portal (`app/page.tsx`, client component) following the
approved Stitch design (v2):

- Sticky header with section navigation and mobile menu
- Centered hero with working topic search and popular-topic shortcuts
- 9 clinical domains with life-stage filter (All / Reproductive / Perinatal / Mature)
- 3 peer-reviewed clinical guide cards with freely-licensed photography
  (Wikimedia Commons, attributed under the grid)
- AI triage sandbox **preview** (static illustration — not connected to any model)
- Provider directory **preview** (mockup entries, labelled illustrative)
- Clinical Governance Charter, footer with SA emergency numbers and clinical disclaimer

## Tech stack

Next.js 16.4.0 (App Router, Turbopack) · React 19 · TypeScript 5.7.3 ·
Tailwind CSS 4 · shadcn/Base UI · lucide-react · pnpm.
Full detail: `docs/technology-stack.md`. Architecture: `docs/system-architecture.md`.

## Getting started

Requirements: Node.js 24+, pnpm.

```powershell
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build (output is fully static)
pnpm start    # serve the production build
```

No environment variables, database, or external services are required.

## Repository layout

```
app/                  # App Router: page.tsx (home), layout.tsx, globals.css
components/ui/        # shadcn button (currently unused by the page)
lib/                  # cn() class helper
public/               # icons, placeholders, guides/ (Wikimedia Commons photos)
docs/                 # status, stack, architecture, roadmap, privacy, testing evidence
```

## Verification

```powershell
pnpm exec tsc --noEmit   # type check — passes (exit 0)
pnpm build               # production build — passes, / prerenders static
```

Evidence and screenshot verification: `docs/testing-results.md`.

## Known limitations

- All clinical content is static copy from the design mockup, not an approved content registry.
- No authentication, roles, or server-side checks exist.
- `next.config.mjs` sets `typescript.ignoreBuildErrors: true` — see `docs/current-status.md`.
- No licence selected yet (`LICENSE` intentionally absent); no contribution policy yet
  (`CONTRIBUTING.md` intentionally absent) — pending owner decisions.

Further reading: `docs/project-overview.md`, `docs/development-roadmap.md`, `SECURITY.md`.
