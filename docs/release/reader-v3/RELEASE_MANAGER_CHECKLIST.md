# Release Manager Checklist — Reader Experience v3

## Build identity
- [ ] Candidate SHA recorded
- [ ] Cloudflare preview proven to serve candidate SHA
- [ ] CI/checks green on exact candidate SHA
- [ ] No unrelated PR merged after candidate cut

## Product behavior
- [ ] Active word advances in all modes
- [ ] Active sentence is one continuous subtle surface
- [ ] No per-word sentence boxes
- [ ] Pause freezes position and scroll
- [ ] Resume continues without jump
- [ ] Seek aligns time, word, sentence and viewport
- [ ] Section transition preserves deterministic state
- [ ] Rotation and resize preserve reading position

## Layout and accessibility
- [ ] Settings never cover text
- [ ] Playback controls never collapse reading viewport
- [ ] Large text, cream and dark themes pass
- [ ] Manual scroll override works without fighting the user
- [ ] Reduced motion, keyboard and screen-reader checks pass

## Device and content matrix
- [ ] Samsung S24+
- [ ] Samsung A-series
- [ ] Pixel
- [ ] iPhone
- [ ] Tablet
- [ ] Short section
- [ ] Long reading
- [ ] Public-domain reading
- [ ] Personal text
- [ ] 30-minute soak

## Risk and recovery
- [ ] Open P0 = 0
- [ ] Open P1 = 0
- [ ] Known P2/P3 risks documented and accepted
- [ ] Rollback SHA recorded
- [ ] Production smoke owner and steps recorded

## Decision
Release Manager may write `RELEASE DECISION: GO` in Issue #64 only when every mandatory item above is checked and each sign-off includes exact evidence plus a second-eye reviewer. Otherwise the decision remains `NO-GO`.
