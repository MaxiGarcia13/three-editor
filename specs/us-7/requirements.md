# US-7 — Multi-clip blending

Delta for playing / mixing more than one clip with weights or cross-fades. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-2. Post-MVP.

## Story

As an editor user, I can create a new animation in the library and blend or cross-fade source clips into that draft without mutating the source clips.

## Acceptance

- [ ] User can start a **New animation** from the Library Animations section (blank draft entry)
- [ ] User can enable at least two concurrent actions (or an explicit A→B cross-fade) while authoring the draft
- [ ] Blend weights or fade duration are user-controllable; timing for the draft is editable
- [ ] Resulting pose updates live in the viewport on the draft (source library clips stay read-only)
- [ ] Export behavior for blended results is locked: **save/bake the draft to one library clip** — see [`design.md`](./design.md#export-contract-locked); export otherwise stays discrete library clips

## Out of scope for this delta

- Full nonlinear editorial (NLA strips with arbitrary tracks)
- Retargeting (US-6), morphs, curve editor, undo
