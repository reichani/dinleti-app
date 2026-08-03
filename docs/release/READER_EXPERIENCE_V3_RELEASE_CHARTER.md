# Reader Experience v3 Release Charter

**Status:** IN DELIVERY  
**Source of truth:** GitHub Issue #64  
**Integration branch:** `release/reader-experience-v3`  
**Baseline:** `bd7497c9c002147fe0b6154c01aacb23d0c93e11`

## Product outcome

Okurio reader must deliver a calm, predictable reading flow comparable in reliability and polish to Kindle and Google Play Books while preserving Okurio's accessibility differentiation.

The user must never need to search for the current reading position. Time, audio, word, sentence, viewport and controls must remain in one deterministic state model.

## Release operating model

1. No reader-affecting change merges directly to `main` during this release.
2. Every workstream delivers into this integration branch through a reviewed PR.
3. Release Management owns sequencing, conflict resolution, evidence collection and the final GO/NO-GO decision.
4. A green build alone is not release approval. Real-device acceptance and UX sign-off are mandatory.
5. Failed experiments are removed from the release branch; they are not accumulated as compatibility patches.

## Workstream contracts

### Product and UX

Deliver:
- final reader information architecture;
- active-word and active-sentence visual specification;
- layout rules for header, settings, text viewport and transport controls;
- responsive rules for small mobile, tablet and desktop;
- benchmark findings against Kindle, Google Play Books and Apple Books.

Acceptance:
- active sentence is one continuous, subtle surface;
- active word remains unmistakable without visual noise;
- settings never cover reading content;
- no large unexplained empty regions or layout jumps.

### Reader Engine

Deliver:
- one canonical reader state reducer;
- explicit events for play, pause, seek, section change, mode change, TTS boundary, elapsed-time fallback and viewport change;
- one mapping from canonical position to word and sentence indices;
- one scroll controller with user-interaction suspension;
- removal or isolation of competing DOM-observer patches.

Acceptance:
- state transition outcomes are deterministic;
- TTS and self-reading modes use the same position model;
- pause freezes time, highlight and scroll;
- seek immediately produces the correct sentence and word;
- section-end behavior has no dead zone.

### Accessibility

Deliver:
- dyslexia, ADHD, low-vision and reduced-motion review;
- contrast and touch-target report;
- keyboard and screen-reader contract;
- focus-line and sentence-focus recommendations.

Acceptance:
- accessibility modes do not create conflicting highlights;
- reduced motion removes animated scroll without losing position;
- all interactive controls have meaningful names and states.

### QA and Device Lab

Required matrix:
- Samsung S24+;
- Samsung A-series;
- Google Pixel;
- iPhone;
- tablet.

Required flows:
- Dinliyorum, Birlikte Okuyorum, Kendim Okuyorum;
- play, pause, resume, seek -15/+30;
- section transition;
- font-size extremes;
- cream and dark themes;
- portrait and landscape;
- short section, long reading, public-domain reading and personal text.

Acceptance:
- 30-minute soak test without lost position, double scroll, frozen highlight or covered text;
- screenshots and recordings attached to the release PR;
- defect results classified by severity and device.

### Performance

Deliver:
- scroll FPS and long-task evidence;
- layout-shift review;
- observer/event frequency review;
- memory and battery-risk notes.

Acceptance:
- no visible scroll jank on the Samsung S24+ target;
- no mutation loop or competing smooth-scroll animation;
- no continuous background work while paused.

### Content Integration

Deliver:
- proof that every runtime content type uses the canonical reader contract;
- separation between catalog eligibility and reader execution;
- representative content fixtures for regression testing.

Acceptance:
- `full-reading`, `micro-exercise`, `preparing` and personal text cannot fork reader state behavior;
- content duration metadata cannot freeze or disable an otherwise valid reader session.

### Release Management

Deliver:
- dependency and merge order;
- four-eyes sign-off register;
- CI and device evidence index;
- release notes;
- production smoke plan;
- rollback commit and trigger list.

## Quality gates

The release is blocked unless all are true:

- active word progresses in all three reading modes;
- active sentence is rendered as one continuous focus surface;
- manual scrolling pauses automatic tracking and resumes predictably;
- pause freezes all reader movement;
- seek and section changes re-align immediately;
- first and last sentences can reach the comfort line;
- settings and transport controls never obscure text;
- all target-device tests pass;
- 30-minute soak test passes;
- no P0/P1 defect remains;
- Product, UX, Accessibility, QA and Release Management sign off.

## Release evidence format

Each workstream posts to Issue #64:

- **Status:** PASS / BLOCKED
- **Commit or PR:** exact SHA/link
- **Evidence:** test output, screenshots, recording or report
- **Known risks:** explicit list
- **Rollback:** exact action
- **Reviewer:** named second eye

## Production sequence

1. Freeze `main` for reader changes.
2. Complete workstream PRs into the integration branch.
3. Run full CI and browser matrix on exact release head.
4. Deploy one Cloudflare release preview.
5. Complete real-device acceptance.
6. Release Manager records GO decision.
7. Squash-merge the single release PR to `main`.
8. Verify production smoke flow.
9. Keep rollback candidate available until post-release acceptance closes.
