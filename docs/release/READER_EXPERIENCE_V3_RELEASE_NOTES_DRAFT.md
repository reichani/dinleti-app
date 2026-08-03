# Reader Experience v3 — Release Notes Draft

## Summary

Reader Experience v3 replaces the accumulated reader hotfix behavior with one aligned release package covering state synchronization, sentence focus, viewport control, responsive layout, accessibility, device validation and release governance.

## User-facing outcomes

Planned outcomes:

- active word and active sentence remain synchronized in every reading mode;
- sentence focus appears as one calm surface rather than separate word boxes;
- reading position remains visible through play, pause, seek, section transition and rotation;
- manual scrolling always takes priority;
- settings and playback controls never obscure reading content;
- short and long texts share the same reliable reader behavior;
- large type, cream theme and accessibility options remain stable on mobile.

## Known status

This document is a draft. The release is currently NO-GO until the evidence and sign-off register are complete.

## Rollback principle

The final release must identify one exact pre-release production commit and one exact v3 merge commit. Rollback is a single revert/redeploy operation; partial feature rollback is not accepted.
