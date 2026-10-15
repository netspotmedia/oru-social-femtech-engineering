# Testing Results

No test framework or CI exists in this repo yet. All results below are from
manual runs on 15 Oct 2026 against commit `6e8a5ed` (Node v24.15.0, pnpm 11.3.0,
Windows). No test result is fabricated; failures and gaps are recorded as-is.

## Runs

| Check | Command | Result |
|---|---|---|
| Type check | `pnpm exec tsc --noEmit` | Pass (exit 0), TS 5.7.3 |
| Production build | `pnpm build` | Pass — `/` and `/_not-found` prerendered static |
| Secret scan | grep `app/` for `sk-`, `AKIA`, `api[_-]?key`, `password`, `secret`, `token` | No matches |
| Full-page visual | headless Chrome 1440px, `page.screenshot(fullPage)` vs Stitch v2 `screen.png` | Match section-for-section (see notes) |
| Guides section visual | element screenshot of `#guides` | All 3 photos render correctly |
| Image load assertion | `img.complete && naturalWidth > 0` for all `#guides img` | 3/3 pass (960, 960, 810px) |
| Filter behaviour | search + life-stage pills via page logic review | Domains filter/reset correctly; empty state with reset on no match |

## Visual-comparison notes

Deliberate, rules-driven deviations from the mockup: gradient-free real photos
(Wikimedia Commons, attributed) instead of unlicensed stock; provider/guide
figures labelled illustrative; decorative "View Availability" / "Flag
discrepancy" elements are non-focusable spans so they don't fake interactivity
to keyboard/screen-reader users.

## Not covered (gaps)

Unit/integration/E2E suites, accessibility runner (keyboard/SR/contrast audit),
slow-network and small-screen checks beyond responsive Tailwind classes, security
headers/CSP review, dependency audit. These are Stage D/E work once a test runner
and CI exist.
