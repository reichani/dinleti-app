# Reader Experience v3 — GO Readiness Plan

## Current decision
NO-GO until all mandatory gates are evidenced.

## Critical path
1. Reader Engine: canonical position model and deterministic transitions.
2. UX: sentence-level focus surface, active-word emphasis, stable responsive layout.
3. Scroll: one owner, manual override, start/end padding, no double scroll.
4. Accessibility: dyslexia/ADHD/low-vision/reduced-motion acceptance.
5. QA: automated matrix, real devices and 30-minute soak.
6. Release Management: exact-head verification, preview, rollback and production smoke.

## Exit criteria
- No open P0/P1.
- Active word, sentence and viewport stay aligned in all three reading modes.
- Sentence focus renders as one continuous subtle surface; no per-word boxes.
- Pause/resume/seek/section/orientation are deterministic.
- Settings and transport never obscure text.
- Samsung S24+, Samsung A-series, Pixel, iPhone and tablet pass.
- Short, long, public-domain and personal text pass.
- 30-minute soak has no lost position, stalled highlight, double scroll or layout collapse.
- Benchmark average >= 2.5/3, with position/highlight/scroll = 3/3.
- Product, UX, Accessibility, QA and Release Management sign-off recorded in Issue #64.

## Release manager decision rule
GO is allowed only when every required evidence row in `SIGNOFF_REGISTER.md` is PASS and points to an exact commit SHA, test evidence and second-eye reviewer. Any missing evidence or open P0/P1 means NO-GO.
