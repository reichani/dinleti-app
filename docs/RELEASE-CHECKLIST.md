# Okurio Release Checklist

## Release classification

- [ ] Hotfix — content addition is not required
- [ ] Planned product release — Product Owner and relevant Experience Lead review is required

## Product boundary

- [ ] Reading remains the primary experience
- [ ] Social-emotional support is delivered only through story or reading interaction
- [ ] No diagnosis, screening, therapy, treatment or clinical recommendation claim
- [ ] No child behaviour score or classification
- [ ] Child dignity is preserved
- [ ] One primary developmental theme per story
- [ ] Optional reflection is unscored and never required for completion

## Build and deployment

- [ ] `npm ci` succeeds
- [ ] `npm run build` succeeds
- [ ] Package manifest and lockfile are synchronized
- [ ] Preview deployment opens without blank/black screen
- [ ] Console contains no blocking error
- [ ] Rollback commit is recorded

## Reading regression

- [ ] Story opens
- [ ] Self-reading mode does not auto-advance
- [ ] TTS starts once
- [ ] Word highlighting follows speech
- [ ] Sentence highlighting follows speech
- [ ] Pause freezes speech and progress
- [ ] Resume continues from the same position
- [ ] Speed change does not reset or accelerate unexpectedly
- [ ] Scrolling does not mutate reading position
- [ ] Closing and reopening preserves progress

## Accessibility

- [ ] Mobile tested
- [ ] Tablet tested
- [ ] Desktop tested
- [ ] Keyboard navigation tested
- [ ] Visible focus tested
- [ ] Screen-reader labels reviewed
- [ ] Theme contrast reviewed
- [ ] Font-size range works from 14px to 32px
- [ ] Reading Ruler works independently
- [ ] Line Focus works independently
- [ ] Accessibility Product Owner approval recorded

## Dyslexia experience gate

- [ ] Maximum 12 words per sentence
- [ ] Target average six to ten words per sentence
- [ ] Maximum three sentences per paragraph
- [ ] Visual and decoding load reviewed
- [ ] Spacing and font behaviour reviewed
- [ ] Glossary definitions are short and age appropriate
- [ ] Dyslexia Product Experience Lead approval recorded

## ADHD experience gate

- [ ] Screen does not create avoidable attention overload
- [ ] Primary action is clear
- [ ] Story rhythm and section length are appropriate
- [ ] No unnecessary animation, interruption or control density
- [ ] Bionic Reading remains optional and experimental
- [ ] ADHD Product Experience Lead approval recorded

## Social-emotional reading gate

Complete for every relevant story, prompt or feature:

- [ ] Emotion representation is age appropriate
- [ ] Perspective taking is shown without moralising
- [ ] Impulsive reactions are framed without shame or labels
- [ ] Character dignity is preserved
- [ ] No clinical, therapeutic or diagnostic language
- [ ] Reflection prompt is optional, unscored and non-classifying
- [ ] Social-Emotional Reading Lead status recorded as approved, approved with conditions or not applicable

## User content

- [ ] Paste works
- [ ] TXT works
- [ ] DOCX works or is clearly labelled unavailable for this release
- [ ] Text-based PDF works or is clearly labelled unavailable for this release
- [ ] Unsupported formats show a clear message
- [ ] User content and filename are not sent to analytics

## Content Product Owner gate

For each new or updated pilot story:

- [ ] Product Owner approved
- [ ] Original Okurio content
- [ ] Character roles are consistent
- [ ] Two to five minutes
- [ ] Age band defined
- [ ] Content track defined
- [ ] Primary developmental theme defined
- [ ] Three to eight glossary words supplied
- [ ] TTS and highlighting reviewed
- [ ] Copyright status confirmed
- [ ] `clinicalBoundaryChecked` recorded

## Analytics

- [ ] reading_started
- [ ] reading_completed
- [ ] reading_paused
- [ ] reading_resumed
- [ ] focus_mode_enabled
- [ ] theme_changed
- [ ] font_changed
- [ ] tts_started
- [ ] tts_completed
- [ ] dictionary_opened
- [ ] word_definition_viewed
- [ ] word_pronunciation_played
- [ ] reflection_prompt_viewed where applicable
- [ ] No free-text reflection answer, emotional classification or health data is sent to analytics

## Experience Leadership Council approval

- [ ] Accessibility Product Owner — approved
- [ ] Dyslexia Product Experience Lead — approved
- [ ] ADHD Product Experience Lead — approved
- [ ] Social-Emotional Reading Lead — approved / approved with conditions / not applicable
- [ ] Content Product Owner — approved for content releases
- [ ] No unresolved `changes required` decision

## Final approval

- [ ] No regression in reading experience
- [ ] Preview link tested on real Samsung Chrome
- [ ] Preview link tested on Samsung Internet for P0 reading changes
- [ ] Release notes and content report attached
- [ ] Manifesto boundary test passed
