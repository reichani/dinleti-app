# Reader Experience v3 — Delivery Board

## Merge sequence

1. Reader architecture and canonical state model
2. UX sentence-group rendering and responsive layout
3. Scroll controller and user-interaction arbitration
4. Accessibility contracts
5. Content integration fixtures
6. Performance instrumentation and limits
7. Cross-device regression suite
8. Release packaging, notes and rollback

No downstream workstream may compensate for an upstream defect with a new runtime patch.

## Work packages

### RE3-01 — Canonical Reader State

**Output**
- state reducer and event model;
- canonical elapsed/section/word/sentence position;
- TTS boundary and elapsed fallback adapters;
- deterministic pause, resume and seek.

**Done when**
- no mode-specific position truth exists;
- unit tests cover all state transitions;
- first-word freeze cannot recur.

### RE3-02 — Sentence-Level Reading Surface

**Output**
- sentence groups rendered explicitly;
- one continuous active-sentence surface;
- active-word emphasis inside that group;
- no per-word sentence outlines.

**Done when**
- cream and dark themes pass visual review;
- large font maintains a calm visual hierarchy;
- active sentence changes without layout jump.

### RE3-03 — Viewport and Scroll Controller

**Output**
- one scroll owner;
- comfort-line positioning;
- first/last sentence spacer policy;
- manual-interaction pause and predictable resumption.

**Done when**
- no nested competing scroll areas;
- no MutationObserver scroll loop;
- short and long sections pass.

### RE3-04 — Reader Layout System

**Output**
- responsive shell for phone, tablet and desktop;
- settings sheet contract;
- protected text viewport;
- transport safe area.

**Done when**
- no control overlays content;
- orientation changes preserve reading position;
- minimum and maximum font sizes remain usable.

### RE3-05 — Accessibility Review

**Output**
- dyslexia, ADHD, low-vision and reduced-motion checks;
- semantic and keyboard review;
- contrast/touch-target evidence.

### RE3-06 — Runtime Content Alignment

**Output**
- representative fixtures for all catalog/runtime types;
- one reader interface for every valid session;
- catalog status isolated from reader execution.

### RE3-07 — Device and Soak Validation

**Output**
- automated viewport matrix;
- real-device evidence;
- 30-minute soak results;
- defect register.

### RE3-08 — Release Package

**Output**
- exact-head CI evidence;
- Cloudflare preview acceptance;
- release notes;
- rollback candidate;
- production smoke checklist;
- GO/NO-GO record.

## Reporting cadence

Every workstream update must be posted to Issue #64 in this format:

```text
Workstream:
Status: PASS | IN PROGRESS | BLOCKED
Head SHA / PR:
Evidence:
Open defects:
Dependencies:
Second-eye reviewer:
Release recommendation:
```
