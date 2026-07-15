# Okurio Release Checklist

## Release classification

- [ ] Hotfix — content addition is not required
- [ ] Planned product release — Product Owner content review is required

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
- [ ] Maximum 12 words per sentence
- [ ] Target average six to ten words per sentence
- [ ] Maximum three sentences per paragraph
- [ ] Age band defined
- [ ] Three to eight glossary words supplied
- [ ] Definitions are short and age appropriate
- [ ] TTS and highlighting reviewed
- [ ] Copyright status confirmed

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

## Final approval

- [ ] No regression in reading experience
- [ ] Product Owner approved release content
- [ ] Preview link tested on real Samsung Chrome
- [ ] Preview link tested on Samsung Internet for P0 reading changes
- [ ] Release notes and content report attached
