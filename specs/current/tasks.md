# Tasks — current

Work queue for the MVP. Prefer opening `specs/us-<n>/` for the active ship; tick here when acceptance passes and the delta is folded.

## Bootstrap (done when specs + AGENTS exist)

- [x] `AGENTS.md` + `specs/current/` + `CHANGELOG.md` + `specs/us-1/` … `specs/us-5/`

## Dependencies (before US-1 code)

- [ ] Add `three`, `@react-three/fiber`, `@react-three/drei`, and Three type packages as needed

## US-1 — Character load & viewport

Scoped delta: [`specs/us-1/`](../us-1/) — **not started**

- [ ] Editor island + full-screen R3F viewport
- [ ] Character upload + load into scene
- [ ] Orbit / pan / zoom; empty and error states
- [ ] Collapsible sidebar shell

## US-2 — Animation library & playback

Scoped delta: [`specs/us-2/`](../us-2/) — **not started**

- [ ] Multi-file animation import → clip library
- [ ] Active clip selector
- [ ] Play / Pause / Stop / loop / scrubber ↔ mixer
- [ ] Skeleton mismatch error UX

## US-3 — Clip trim & time scale

Scoped delta: [`specs/us-3/`](../us-3/) — **not started**

- [ ] Clone-then-trim Start/End UI
- [ ] Session recoverability of pre-trim clip
- [ ] Speed slider → `mixer.timeScale`

## US-4 — Keyframe edit

Scoped delta: [`specs/us-4/`](../us-4/) — **not started**

- [ ] Pause / scrub + raycast selection + TransformControls
- [ ] Save Keyframe at Current Time → track insert/update

## US-5 — Export

Scoped delta: [`specs/us-5/`](../us-5/) — **not started**

- [ ] Bake time scale into tracks per design
- [ ] GLTFExporter download of character + all edited clips
