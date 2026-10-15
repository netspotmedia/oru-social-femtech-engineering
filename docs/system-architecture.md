# System Architecture

## Current architecture (verified 15 Oct 2026, commit `6e8a5ed`)

A single static page. There is no server boundary beyond Next.js route handling,
no persistence boundary, and no external integration boundary.

```text
Browser
  -> Next.js App Router `/` (static prerender + client hydration)
  -> app/page.tsx — search/filter state held in useState/useMemo only
  -> no fetch, no server actions, no API routes, no database
```

## Files and responsibilities

| File | Responsibility |
|---|---|
| `app/page.tsx` | Entire home page: header, hero search, domain filter, guides, AI preview, providers preview, governance, footer |
| `app/layout.tsx` | Root layout, metadata, production-only Vercel Analytics |
| `app/globals.css` | Tailwind 4 + shadcn preset + design tokens |
| `components/ui/button.tsx` | shadcn button (present, currently unused by the page) |
| `lib/utils.ts` | `cn()` class-name helper |
| `public/guides/` | 3 freely-licensed guide photos (Wikimedia Commons, attributed in-page) |
| `public/placeholder-user.jpg` | Generic avatar used for illustrative provider cards |

## Data flow

All content is hardcoded in `app/page.tsx` (`domains`, `guides`, `providers` arrays).
User input (search query, life-stage filter, mobile menu) never leaves the browser.
Images are same-origin static files. Analytics (production only) collects no
health data by itself.

## Trust boundaries (target — none yet enforced in code)

- Browser ↔ application server (no server logic exists yet)
- Application server ↔ database / platform API (no connection exists)
- Application server ↔ AI vendor (no connection exists; preview is static JSX)
- Editor ↔ governance workflow (no admin surface exists)

## Design decisions

- **Static first:** `pnpm build` prerenders `/` to static HTML; the page works without JavaScript for reading (interactive filter needs JS).
- **No external runtime dependencies:** fonts are system stack; images are local; no CDN scripts. This keeps the page usable on slow connections and avoids third-party data sharing.
- **Illustrative data labelling:** provider names, licence numbers, counts, and
  availability shown are mockup placeholders and are labelled as such in the UI,
  per the no-fabrication engineering rule.

## Gaps before any backend is added

No validation layer, error model, pagination, rate limits, audit events, retention
policy, consent flow, or rollback design. See `docs/development-roadmap.md` and
`docs/privacy-and-safety.md`.
