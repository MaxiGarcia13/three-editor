# US-10 — Full undo / redo

Delta for a command stack covering animation edits beyond pre-trim session restore. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-3 / US-4 (and later US-8 / US-9 when present). Post-MVP.

## Story

As an editor user, I can undo and redo animation edits (trim, keyframes, and related clip mutations) within the session.

## Acceptance

- [ ] Undo / Redo controls (and standard shortcuts) reverse and reapply discrete edit commands
- [ ] Covered operations include at least: trim apply, keyframe save/update/delete, and speed changes that mutate exported bake intent if stored on the clip — document exact command set in design
- [ ] Stack is per-session (not persisted to disk unless explicitly added later)
- [ ] Pre-trim “restore” from US-3 either becomes a command on the stack or is superseded by undo without breaking acceptance of US-3
- [ ] Undoing does not leave the mixer bound to a disposed/stale clip

## Out of scope for this delta

- Cross-document / cross-file history
- Collaborative OT/CRDT
- Retarget / blend / morph / curve features themselves (only undo integration when those exist)
