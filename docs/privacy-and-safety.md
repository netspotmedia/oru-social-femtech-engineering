# Privacy and Safety

> Guidance notes, not legal advice and not a compliance certification. POPIA and
> any other jurisdictional review by qualified counsel is still outstanding.

## Current data posture (verified)

The prototype **collects, stores, and transmits no personal or health data**:

- No accounts, forms that submit, cookies set by the app, or local persistence.
- Search input never leaves the browser (client-side filter only).
- Images and fonts are same-origin; no third-party requests are made by the page.
- `@vercel/analytics` (production only) measures page views; it is not fed any
  health information. Confirm hosting-region and retention settings before release.

## Rules for future work

1. **Data minimisation:** do not collect identifiable health information unless a
   reviewed feature requires it; never put health questions in URLs, analytics
   payloads, or unredacted logs.
2. **No unrelated reuse:** health information must never feed advertising or profiling.
3. **AI boundary:** before any identifiable health data goes to an external AI
   provider, documented privacy, legal, security, contractual, and vendor approval
   is required. The assistant must always present as general education, never
   diagnose, prescribe, or promise outcomes, and must cite only retrieved approved
   sources. Provider results must come from the real directory, never the model.
4. **Urgent situations:** any triage surface must implement the clinically reviewed
   escalation policy (emergency numbers 112 / 10177) and never attempt to diagnose
   emergencies.
5. **Imagery:** use licensed/approved images only. Current guide photos are
   Wikimedia Commons files (freely licensed) with file-page attribution linked
   under the guides grid. Provider avatars use a generic local silhouette —
   never a real person's photo without consent.
6. **Illustrative data:** mockup provider names, licence numbers, counts, and
   availability are labelled as design-preview data in the UI. They must be
   replaced by verified registry data — never silently presented as real.
7. **Reporting:** the UI links `#governance` reporting entry points ("Report
   clinical inaccuracy", "Flag discrepancy"); no report-handling backend exists yet.

## Safeguarding notes

Content targets women and girls, including minors in some journeys. Age-appropriate
safeguarding, consent, and escalation design must precede any interactive health
feature, with clinical-reviewer sign-off on wording.
