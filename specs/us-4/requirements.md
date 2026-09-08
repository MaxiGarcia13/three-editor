# US-4 — Keyframe edit

Delta for pausing, selecting bones/meshes, and saving keyframes. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-2 (mixer + active clip); US-3 helpful but not strictly required for save-at-time.

## Story

As an editor user, I can pause on the timeline, move a selected bone/mesh, and save a keyframe at that time.

## Acceptance

- [ ] User can pause at an arbitrary timestamp (scrub or pause during play)
- [ ] Raycast selects a bone or mesh; TransformControls move the selection
- [ ] “Save Keyframe at Current Time” appears in the preview only after the selection’s local pose has been edited (TransformControls), and captures local position / rotation / scale
- [ ] Button finds or creates the matching `VectorKeyframeTrack` / `QuaternionKeyframeTrack` on the **active** clip and inserts or updates keyframes at the current clip-local time (the same `[0, duration]` timestamp the timeline playhead shows — not raw accumulated `mixer.time`)

## Out of scope for this delta

- Export / bake
- Multi-selection, graph editor curves, onion skinning
- Retargeting or auto-creating missing bones
