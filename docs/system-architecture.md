# System Architecture Audit

## Current architecture
The workspace currently contains a single static App Router page with global Tailwind/shadcn styles. There is no server boundary beyond Next's default route handling, no persistence boundary, and no external integration boundary.

```text
Browser
  -> Next.js App Router `/`
  -> static placeholder JSX
```

## Required target architecture (approval-dependent)
The smallest safe vertical slice should preserve a clear separation:

```text
Browser
  -> accessible Women's Health portal UI
  -> server route/action with schema validation and rate limits
  -> authoritative content/provider service
  -> approved data source

Optional AI navigation:
  -> server-only bounded adapter
  -> approved source registry/retrieval
  -> safety policy + validated citations
```

Provider records must come from the authoritative source. AI must never be the source of provider names, credentials, availability, prices, or booking claims.

## Trust boundaries to review
- Browser to application server.
- Application server to database/platform API.
- Application server to AI vendor, if approved.
- Admin/editor to governance workflows.
- External source ingestion to reviewed publication state.

## Data minimisation requirements
Do not collect identifiable health information for the initial portal. Keep analytics event-level and non-sensitive. Do not place health questions in URLs or unredacted logs. Private data must not be shared through public caches.

## Architecture gaps
- No user identity or role source.
- No source-of-truth contracts for resources/providers/appointments.
- No validation, error model, pagination, rate limits, or audit events.
- No retention, deletion, consent, incident, or rollback design.
- No clinical safety review process.

## Proposed first slice
Public, read-only health education portal using an approved, explicitly test-labelled fixture repository only if the owner approves prototype mode. It should include categories, a reviewed-resource detail state, accessible loading/empty/error states, and a clear handoff to provider discovery. Provider and AI features remain disabled until their authoritative sources and safety approvals exist.

## Change log
- 2026-10-14: Documented current and target boundaries from repository audit.
