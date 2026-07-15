# Okurio Demo Implementation Board

Branch: `okurio-prd-demo-v1`

Base: stable commit `6010a20211ca875d16053d549c1d9f1dbea7c82e`

## Delivery rule

Work is implemented in the order below. A stage cannot be marked complete until its acceptance gate passes. Reading engine refactors are not mixed with content or visual quick wins.

The `OKURIO-MANIFESTO-v1.0.md` is the product constitution. Reading remains the primary experience. Social-emotional development is supported only through stories and optional reflection, without diagnostic, therapeutic or clinical claims.

## Current strategic priority

Primary delivery focus:

1. Pilot Catalog — 25 original stories
2. Target Word and Glossary Package
3. Contextual Dictionary Demo
4. Mobile Reading UX and safe quick wins
5. Progress, pause and highlight regression protection
6. Canonical readingState refactor after pilot experience is stable

Capacity guidance for the current demo cycle:

- 60% content and glossary
- 20% contextual dictionary and mobile UX
- 10% regression protection
- 10% architecture preparation and technical debt

## Stage 0 — Scope, manifesto and release protection

- [x] Create protected demo branch from stable commit
- [x] Add PRD as source of truth
- [x] Add release checklist
- [x] Add Okurio Product Manifesto
- [x] Define Experience Leadership Council
- [ ] Add existing-behaviour regression matrix
- [ ] Confirm Cloudflare preview branch configuration

Acceptance gate:
- Manifesto, PRD, board and checklist use the same product boundaries
- Clinical and therapeutic claims are explicitly excluded
- Experience Lead release responsibilities are recorded

## Stage 1 — Pilot catalog architecture and content plan

- [ ] Create 25-story catalog inventory
- [ ] Define five content tracks with five stories each
- [ ] Define story metadata schema
- [ ] Extract pilot content metadata from `App.jsx`
- [ ] Add `pilotEligible` content flag
- [ ] Keep long stories in source but hide them from pilot surfaces
- [ ] Add content quality validator
- [ ] Produce release content report
- [ ] Record Product Owner and Experience Lead approval fields

Pilot tracks:

1. İlk Okuma
2. Dikkat ve Odak
3. Duygu Tanıma ve İfade
4. Empati ve Perspektif Alma
5. Öz Düzenleme ve Dürtü Farkındalığı

Required metadata:
- id
- title
- ageBand
- estimatedMinutes
- pilotEligible
- contentTrack
- primaryDevelopmentTheme
- contentStatus
- productOwnerApproved
- accessibilityApproved
- dyslexiaExperienceApproved
- adhdExperienceApproved
- socialEmotionalReviewStatus
- characters
- paragraphs
- glossary
- optionalReflectionPrompt
- clinicalBoundaryChecked

Acceptance gate:
- No duplicate story ID
- Every story has one primary developmental theme
- No story uses diagnostic, therapeutic or shaming language
- Every social-emotional story has Social-Emotional Reading Lead review

## Stage 2 — Safe quick-win release

- [ ] Hide stories longer than five minutes from pilot surfaces
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
- No accessibility control becomes harder to find or use

## Stage 3 — First content production package

- [ ] Produce two original Okurio stories as implementation templates
- [ ] Include 3–8 approved glossary words per story
- [ ] Add one optional reflection prompt only where relevant
- [ ] Run sentence, paragraph and duration validator
- [ ] Complete Content Product Owner review
- [ ] Complete Dyslexia Product Experience Lead review
- [ ] Complete ADHD Product Experience Lead review
- [ ] Complete Social-Emotional Reading Lead review or mark not applicable

Acceptance gate:
- Maximum 12 words per sentence
- Target average 6–10 words per sentence
- Maximum three sentences per paragraph
- Two to five minutes
- Character roles remain consistent
- Reflection is optional and unscored
- Child dignity and clinical boundary checks pass

## Stage 4 — Contextual dictionary demo

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
- Dictionary does not obscure the current reading position

## Stage 5 — Complete pilot catalog

- [ ] İlk Okuma — 5 approved stories
- [ ] Dikkat ve Odak — 5 approved stories
- [ ] Duygu Tanıma ve İfade — 5 approved stories
- [ ] Empati ve Perspektif Alma — 5 approved stories
- [ ] Öz Düzenleme ve Dürtü Farkındalığı — 5 approved stories
- [ ] Complete approximately 100–150 controlled glossary entries
- [ ] Generate pilot content report

Acceptance gate:
- 25 stories pass validator and all relevant approvals
- Content balance is visible in catalog navigation
- No category presents itself as therapy or treatment
- Every story remains primarily a reading experience

## Stage 6 — Canonical reading state

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

## Stage 7 — Synchronized read-along hardening

- [ ] Enforce one active speech chain
- [ ] Add session token cancellation
- [ ] Define boundary/fallback ownership
- [ ] Test speed changes without reset
- [ ] Test section and story completion
- [ ] Test Chrome and Samsung Internet on a real Samsung device

## Stage 8 — Accessibility completion

- [ ] Reading Ruler independent of TTS
- [ ] Line Focus independent user control
- [ ] Four WCAG-reviewed themes
- [ ] OpenDyslexic real font loading and fallback notice
- [ ] Bionic Reading remains optional and experimental
- [ ] Experience Leads complete final accessibility review

## Stage 9 — User content import

- [ ] Replace global catalog mutation with `userDocument` state
- [ ] Harden paste and TXT import
- [ ] Add DOCX text extraction
- [ ] Add text-based PDF extraction
- [ ] Reject DOC, DOCM, protected and scanned files with clear messages
- [ ] Add size and performance limits

## Stage 10 — Analytics, offline and performance

- [ ] Add required PRD analytics events
- [ ] Add `reflection_prompt_viewed` without storing child responses
- [ ] Add completion definition
- [ ] Cache last opened story
- [ ] Lazy-load catalog content
- [ ] Add bundle-size and load-time checks
- [ ] Add low-end Android performance profile

## Stage 11 — Demo acceptance

Demo is ready only when:
- Pilot catalog contains 25 approved short Okurio stories
- Five content tracks are represented
- Glossary and dictionary card work
- Paste, TXT, DOCX and text-PDF flows work or unavailable items are transparently labelled in the demo scope
- Word and sentence tracking work
- Pause, resume and speed controls work
- Progress is preserved
- Four themes and font controls work
- Mobile, tablet and desktop tests pass
- Real Samsung smoke test passes
- Preview deployment is shareable
- Relevant Experience Leadership Council approvals are recorded
- Product copy contains no clinical or therapeutic claims
