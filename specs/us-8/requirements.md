# US-8 — Morph-target editing

Delta for viewing and keying morph (blend shape) influences. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-1 (character with morphs); US-4 patterns helpful for keyframing. Post-MVP.

## Story

As an editor user, I can adjust morph target influences on the character and save them as animation keyframes.

## Acceptance

- [ ] When the loaded mesh has morph targets, the sidebar lists them with influence sliders
- [ ] Changing influences updates the viewport live while paused or playing
- [ ] User can save morph influence keyframes on the active clip at `mixer.time` (`NumberKeyframeTrack` or equivalent)
- [ ] Meshes without morphs show an empty / unavailable state (not an error crash)
- [ ] Exported GLB (US-5 path) includes morph animation tracks when present

## Out of scope for this delta

- Material / texture editing
- Retargeting, blending, curve graph UI, full undo
