# Reader Experience v3 — Workstream Board

| Workstream | Required delivery | Status |
|---|---|---|
| Product + UX | Final reader behavior, sentence-focus component, responsive layout spec and benchmark | IN PROGRESS |
| Reader Engine | Canonical reducer/state model; TTS and elapsed fallback integration; deterministic transitions | IN PROGRESS |
| Scroll + Performance | Single scroll owner; frame/long-task/layout-shift evidence | NOT STARTED |
| Accessibility | Dyslexia, ADHD, low vision, reduced motion, keyboard and screen-reader evidence | NOT STARTED |
| Content Integration | All runtime content types on one reader contract | NOT STARTED |
| QA / Device Lab | Automated matrix, real-device evidence and 30-minute soak | NOT STARTED |
| Release Management | Exact-head CI, preview mapping, rollback, notes and smoke plan | IN PROGRESS |

## Reporting contract
Each workstream posts to Issue #64:
- `STATUS: PASS | BLOCKED`
- exact SHA/PR
- test/evidence link
- known risks
- rollback note
- second-eye reviewer

No narrative-only PASS is accepted.
