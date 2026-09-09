# US-7 — Multi-clip blending

Delta for playing / mixing more than one clip with weights or cross-fades. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-2. Post-MVP.

## Story

As an editor user, I can create a new animation from scratch or use an uploaded clip, blend/fade it with other library clips, and have blend controls apply immediately.

## Acceptance

- [ ] User can start a **New animation** from the Library (`PlusIcon`) — creates an editable draft from scratch
- [ ] Active animation is selected from the **Animations list** (same pattern as models)
- [ ] Clicking a currently selected animation unselects it to T-pose
- [ ] Draft and uploaded clips support Start/End, playback speed, playback, and keyframe edits on the active clip
- [ ] Any active editable clip can set a Blend partner via select, and weight/fade apply immediately (no Save animation button)
- [ ] Unsaved pose edits discard on reselect; Hold Pose to End commits into the active clip
- [ ] Export: discrete library clips — see [`design.md`](./design.md#export-contract-locked)

## Out of scope for this delta

- Full nonlinear editorial (NLA strips with arbitrary tracks)
- Retargeting (US-6), morphs, curve editor, undo
