# US-4 — Keyframe edit

Delta for pausing, selecting bones/meshes, and saving keyframes. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-2 (mixer + active clip); US-3 helpful but not strictly required for save-at-time.

## Story

As an editor user, I can pause on the timeline, move a selected bone/mesh, and save a keyframe at that time.

## Acceptance

- [ ] User can pause at an arbitrary timestamp (scrub or pause during play)
- [ ] Raycast selects a bone or mesh; TransformControls move the selection
- [ ] “Hold Pose to End” and “Restore Pose” appear in the preview only after the selection’s local pose has been edited (TransformControls); hold captures local position / rotation / scale
- [ ] Hold finds or creates the matching `VectorKeyframeTrack` / `QuaternionKeyframeTrack` on the **active** clip and writes a plateau from the clip-local playhead through **clip duration** (sample at `t` and at `duration`, replacing keys strictly inside) so the pose holds for the rest of the animation; do not extend clip duration. The user can scrub later, edit again, and hold from a new playhead to overwrite
- [ ] Restore discards the unsaved gizmo edit and re-applies the active clip at the current playhead (mixer bindings resume)

## Out of scope for this delta

- Export / bake
- Multi-selection, graph editor curves, onion skinning
- Partial hold-duration UI (hold is always playhead → end)
- Retargeting or auto-creating missing bones
