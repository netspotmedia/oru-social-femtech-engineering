# Development Roadmap

## Stage A — Audit (current)
- Inspect repository, manifests, routes, config, integrations, schema, auth, tests, and deployment metadata.
- Record evidence, blockers, risks, and baseline build result.
- Status: complete for the supplied workspace; external ORU Social systems remain unavailable.

## Stage B — Design (next after approval)
- Confirm whether this is a standalone prototype or an integration into an existing ORU Social platform.
- Define user journeys, responsive screens, reusable components, API contracts, data classifications, threat model, and acceptance criteria.
- Confirm content review, provider verification, clinical safety, privacy, and jurisdiction boundaries.

## Stage C — Approval checkpoint
Required decisions:
1. Authoritative repository/API/database and environment access.
2. Smallest approved MVP slice.
3. Synthetic fixture policy and prototype labeling.
4. Auth and role model.
5. Approved content/source registry and reviewer.
6. Provider data/verification source.
7. AI enabled versus deterministic test adapter.
8. Legal/privacy review and retention policy.
9. Licensing and publication boundary.

## Stage D — Implementation order
1. Portal shell, metadata, responsive/accessibility foundations.
2. Approved resource/category read flow with server-confirmed states.
3. Real provider search/profile flow once source is verified.
4. Existing booking/consultation handoff only; no duplicate telehealth system.
5. Bounded AI navigation only after approved sources, model/privacy review, safety policy, citations, reporting, and rate limits.
6. Restricted governance workflows if required.

## Stage E — Verification
Run type checking without suppression, linting, unit/integration/E2E tests, accessibility checks, security tests, slow-network checks, and the complete synthetic user journey. Record exact commands, results, commit SHA when available, and residual failures.

## Stage F — Handover
Update setup, environment names (never values), migrations/rollback, privacy and safety notes, testing evidence, deployment steps, known limitations, and next tasks.

## Proposed smallest end-to-end MVP
A clearly labelled read-only Women's Health education portal backed by an approved content source or test-only fixture adapter, with category browse, resource detail metadata, search/empty/error states, and a non-clinical safety notice. This is the smallest slice that can be demonstrated without fabricating providers, credentials, bookings, clinical claims, or AI citations.

## Effort estimate
A realistic estimate cannot be produced from this shell alone. It depends on the size and quality of the authoritative ORU Social interfaces, data readiness, privacy review, and whether authentication/provider/AI services already exist. Estimate after those inputs are supplied.

## Change log
- 2026-10-14: Added staged roadmap and approval-dependent MVP boundary.
