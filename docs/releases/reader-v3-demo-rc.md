# Reader v3 Demo-Safe RC

Candidate SHA: `dd092eb0842220d6cd0eb331670cb12408446207`

## Scope

This candidate removes the second synthetic elapsed-time clock that was dispatching progress-bar clicks in `Kendim Okuyorum`. That clock competed with the speech/read state and caused stale or contradictory highlighting.

### Kendim Okuyorum

- No synthetic clock.
- No automatic word or sentence following.
- No automatic scrolling.
- Any stale active token left by the existing React component is visually neutralized.
- Reader position is controlled manually by the user.

### Dinliyorum / Birlikte Okuyorum

- Automatic following runs only while browser speech synthesis is actually speaking.
- Sentence focus is generated only during real speech.
- Pause stops automatic following.
- Manual scrolling temporarily takes control.

## Demo acceptance

1. Open a story in `Kendim Okuyorum`: no orange token and no automatic movement may remain.
2. Switch to `Dinliyorum`: following may appear only after speech starts.
3. Pause: viewport and focus stop.
4. Switch back to `Kendim Okuyorum`: focus disappears immediately and the page stays under manual control.
5. No second clock or synthetic progress click is installed.

## Deliberate trade-off

For tomorrow's demo, `Kendim Okuyorum` behaves as a clean conventional ebook mode rather than estimating the user's silent reading position. Silent-reading auto-follow is deferred until it can be driven by an explicit user-controlled pacing contract instead of a guessed clock.

## Rollback

Baseline before this candidate: `9dd5dbc4bd38a10a75f856ac1f35a14004da6aec`.
