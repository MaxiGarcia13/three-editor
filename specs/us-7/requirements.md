# US-7 — Multi-clip blending

Delta for playing / mixing more than one clip with weights or cross-fades. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-2. Post-MVP.

## Story

As an editor user, I can blend or cross-fade between animation clips on the loaded character.

## Acceptance

- [ ] User can enable at least two concurrent actions (or an explicit A→B cross-fade) on the mixer
- [ ] Blend weights or fade duration are user-controllable
- [ ] Resulting pose updates live in the viewport
- [ ] Export behavior for blended results is locked: **bake a single clip on demand** — see [`design.md`](./design.md#export-contract-locked); export otherwise stays discrete library clips

## Out of scope for this delta

- Full nonlinear editorial (NLA strips with arbitrary tracks)
- Retargeting (US-6), morphs, curve editor, undo
