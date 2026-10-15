# System Architecture

## Current architecture (verified 15 Oct 2026, commit `74312ce` + local fixes)

Server-rendered home page with a read-only Supabase content surface. No
writes, no auth flows, no AI vendor connection.

```text
Browser
  -> Next.js App Router `/` (server component fetches, client hydrates)
  -> app/page.tsx — getPublishedGuides() + normalizeGuides()
  -> Supabase: content_items (published article rows, limit 12)
       ⨝ content_categories(name)
  -> app/page-client.tsx — search/filter state in useState/useMemo only
  -> no mutations, no server actions, no middleware

Browser (or any HTTP client)
  -> GET /api/content[?type=] / GET /api/content/:slug
  -> same published-only queries; 400 / 404 / 503 error model
```

## Files and responsibilities

| File | Responsibility |
|---|---|
| `app/page.tsx` | Server component: fetches published guides, passes `guides` + `guidesFailed` down |
| `app/page-client.tsx` | Entire home page UI: header, hero search, domain filter, guides (+ error notice), AI preview, providers preview, governance, footer |
| `app/api/content/route.ts` | `GET` published-content list (`?type=` allow-listed, 400/503 model) |
| `app/api/content/[slug]/route.ts` | `GET` single published item (404/503 model) |
| `lib/supabase/server.ts` | SSR client, published-only queries, `body`-line card mapping (governed convention) |
| `app/layout.tsx` | Root layout, metadata, production-only Vercel Analytics |
| `app/globals.css` | Tailwind 4 + shadcn preset + design tokens |
| `components/ui/button.tsx` | shadcn button (present, currently unused by the page) |
| `lib/utils.ts` | `cn()` class-name helper |
| `public/guides/` | 3 freely-licensed guide photos (Wikimedia Commons, attributed in-page) |
| `public/placeholder-user.jpg` | Generic avatar used for illustrative provider cards |

## Data flow

Published guide content flows one way: Supabase (`content_items` filtered by
`is_published`, joined `content_categories`) → server mappers
(`toGuideCard`, governed `body`-line convention: reviewer / reference /
credit URL) → `page-client.tsx` cards or API JSON. Query failures propagate a
`failed` flag: the page shows an explicit error notice, the API returns 503 —
never a silent placeholder. User input (search query, life-stage filter,
mobile menu) never leaves the browser. Guide `image_url` values may point at
remote files (plain `<img>`, no remote allowlist); confirm each source before
publishing. Analytics (production only) collects no health data by itself.

## Trust boundaries (partially enforced in code)

- Browser ↔ application server (published GETs only; `type` allow-listed, slug
  parameterized; no rate limits yet)
- Application server ↔ Supabase (publishable/anon key, server-side; RLS
  proposal UNAPPLIED — anon reachability of drafts unverified)
- Application server ↔ AI vendor (no connection exists; preview is static JSX)
- Editor ↔ governance workflow (no admin surface exists; `body`-line authoring
  convention must be governed — see `lib/supabase/server.ts`)

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
