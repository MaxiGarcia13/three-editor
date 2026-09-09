# US-7 — Multi-clip blending

Delta for playing / mixing more than one clip with weights or cross-fades. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-2. Post-MVP.

## Story

As an editor user, I can create a new animation from scratch or use an uploaded clip, preview a weighted blend with other library clips, and Bake when I want that mix written into the active clip.

## Acceptance

- [ ] User can start a **New animation** from the Library (`PlusIcon`) — creates an editable draft from scratch
- [ ] Active animation is selected from the **Animations list** (same pattern as models)
- [ ] Clicking a currently selected animation unselects it to T-pose
- [ ] Draft and uploaded clips support Start/End, playback speed, playback, and keyframe edits on the active clip
- [ ] Settings **Blend** is a collapsible; expanded form has partner select, weight, **Bake**, and **Reset**
- [ ] Blend is viewport-only until Bake; Bake writes into the active clip and resets the form; Reset clears without writing
- [ ] Unsaved pose edits discard on reselect; Hold Pose to End commits into the active clip
- [ ] Export: discrete library clips — see [`design.md`](./design.md#export-contract-locked)

## Out of scope for this delta

- Full nonlinear editorial (NLA strips with arbitrary tracks)
- Retargeting (US-6), morphs, curve editor, undo
