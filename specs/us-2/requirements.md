# US-2 — Animation library & playback

Delta for animation import and mixer UI. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-1 (character loaded in viewport).

## Story

As an editor user, I can import animation files into a clip library and play them on the loaded character.

## Acceptance

- [ ] User can upload multiple separate `.glb` / `.gltf` files; their clips populate an animation library
- [ ] Dropdown (or equivalent) selects the active clip
- [ ] Playback controls: Play, Pause, Stop, loop toggle
- [ ] Timeline scrubber stays tied to `THREE.AnimationMixer` time
- [ ] Clips that do not match the character skeleton (missing tracks / unknown bones) show a user-visible error — no silent retargeting

## Out of scope for this delta

- Trim, time scale UI, keyframe editing, export
- Multi-clip blending / cross-fade
