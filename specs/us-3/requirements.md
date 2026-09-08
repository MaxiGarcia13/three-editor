# US-3 — Clip trim & time scale

Delta for shortening clips and playback speed. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-2 (clip library + mixer).

## Story

As an editor user, I can shorten a clip and change playback speed.

## Acceptance

- [ ] Start Time / End Time inputs trim the **working** copy of the active clip into a `[start, end]` window (track `trim` + time shift + duration on a clone — `AnimationClip.trim()` is a no-arg internal helper in three 0.185)
- [ ] Trim always clones first so the pre-trim clip remains recoverable in the session
- [ ] Speed multiplier slider drives `mixer.timeScale` for playback
- [ ] Export bake behavior for time scale is defined in [`specs/current/design.md`](../current/design.md) and followed when US-5 ships

## Out of scope for this delta

- Baking time scale into tracks (US-5)
- Keyframe editing, export download
- Permanent undo history beyond session pre-trim recovery
