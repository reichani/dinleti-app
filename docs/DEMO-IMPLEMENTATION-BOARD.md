# Okurio Demo Implementation Board

Branch: `okurio-prd-demo-v1`

Base: stable commit `6010a20211ca875d16053d549c1d9f1dbea7c82e`

## Delivery rule

Work is implemented in the order below. A stage cannot be marked complete until its acceptance gate passes. Reading engine refactors are not mixed with content or visual quick wins.

## Stage 0 — Scope and release protection

- [x] Create protected demo branch from stable commit
- [x] Add PRD v1.1 as source of truth
- [ ] Add release checklist
- [ ] Add existing-behaviour regression matrix
- [ ] Confirm Cloudflare preview branch configuration

## Stage 1 — Safe quick-win release

- [ ] Add `pilotEligible` content flag
- [ ] Hide stories longer than five minutes from pilot surfaces
- [ ] Keep long stories in source for later phases
- [ ] Disable automatic Bionic Reading activation
- [ ] Label Bionic Reading as experimental
- [ ] Hide sleep timer and audiobook-oriented controls
- [ ] Standardise four PRD theme names
- [ ] Expand font-size choices to 14–32px
- [ ] Preserve current TTS and reading-clock implementation unchanged

Acceptance gate:
- Current story starts, pauses, resumes and keeps its position
- Mobile and desktop smoke tests pass
- No unexpected auto-scroll or speed change

## Stage 2 — Content release track

- [ ] Extract pilot content metadata from App.jsx
- [ ] Add content quality validator
- [ ] Produce release content report
- [ ] Add two original Okurio stories
- [ ] Add 3–8 approved glossary words to each new story
- [ ] Product Owner approval status stored in metadata

Required metadata:
- id
- title
- ageBand
- estimatedMinutes
- pilotEligible
- contentStatus
- productOwnerApproved
- characters
- paragraphs
- glossary

Acceptance gate:
- Maximum 12 words per sentence
- Target average 6–10 words per sentence
- Maximum three sentences per paragraph
- Two to five minutes
- No duplicate story ID

## Stage 3 — Contextual dictionary demo

- [ ] Highlight only editorially approved target words
- [ ] Open one short definition card on tap/click
- [ ] Keep reading position unchanged
- [ ] Add optional pronunciation button
- [ ] Do not interrupt story TTS unless pronunciation is selected
- [ ] Add privacy-safe analytics adapter events

Acceptance gate:
- Works with touch and mouse
- Keyboard accessible
- Definition card closes with Escape and close button
- No user-uploaded word is sent to analytics

## Stage 4 — Canonical reading state

- [ ] Introduce canonical `readingState`
- [ ] Introduce separate `readingPreferences`
- [ ] Add compatibility adapter for old states
- [ ] Move progress persistence to canonical state
- [ ] Remove old state only after regression tests pass

Acceptance gate:
- One owner for reading position
- Pause freezes all progression
- Settings never alter reading position
- Resume starts from the same word

## Stage 5 — Synchronized read-along hardening

- [ ] Enforce one active speech chain
- [ ] Add session token cancellation
- [ ] Define boundary/fallback ownership
- [ ] Test speed changes without reset
- [ ] Test section and story completion
- [ ] Test Chrome and Samsung Internet on a real Samsung device

## Stage 6 — Accessibility completion

- [ ] Reading Ruler independent of TTS
- [ ] Line Focus independent user control
- [ ] Four WCAG-reviewed themes
- [ ] OpenDyslexic real font loading and fallback notice
- [ ] Bionic Reading remains optional and experimental

## Stage 7 — User content import

- [ ] Replace global catalog mutation with `userDocument` state
- [ ] Harden paste and TXT import
- [ ] Add DOCX text extraction
- [ ] Add text-based PDF extraction
- [ ] Reject DOC, DOCM, protected and scanned files with clear messages
- [ ] Add size and performance limits

## Stage 8 — Analytics, offline and performance

- [ ] Add required PRD analytics events
- [ ] Add completion definition
- [ ] Cache last opened story
- [ ] Lazy-load catalog content
- [ ] Add bundle-size and load-time checks
- [ ] Add low-end Android performance profile

## Stage 9 — Demo acceptance

Demo is ready only when:
- Pilot catalog contains approved short Okurio content
- Paste, TXT, DOCX and text-PDF flows work
- Dictionary card works
- Word and sentence tracking work
- Pause, resume and speed controls work
- Progress is preserved
- Four themes and font controls work
- Mobile, tablet and desktop tests pass
- Real Samsung smoke test passes
- Preview deployment is shareable
