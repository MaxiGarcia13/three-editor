# Tasks — current

Work queue for the MVP. Prefer opening `specs/us-<n>/` for the active ship; tick here when acceptance passes and the delta is folded.

## Bootstrap (done when specs + AGENTS exist)

- [x] `AGENTS.md` + `specs/current/` + `CHANGELOG.md` + `specs/us-1/` … `specs/us-10/`

## Dependencies (before US-1 code)

- [x] Add `three`, `@react-three/fiber`, `@react-three/drei`, and Three type packages as needed

## US-1 — Character load & viewport

Scoped delta: [`specs/us-1/`](../us-1/) — **in progress**

- [ ] Editor island + full-screen R3F viewport
- [ ] Character upload + load into scene
- [ ] Orbit / pan / zoom; empty and error states
- [ ] Collapsible sidebar shell
  - Shell chrome landed (`EditorSidebar` / `EditorPreview`); leave unticked until US-1 acceptance passes

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

## Post-MVP (not started)

### US-6 — Cross-rig retargeting

Scoped delta: [`specs/us-6/`](../us-6/) — **not started**

- [ ] Registry + explicit mapping UI + remapped working clip

### US-7 — Multi-clip blending

Scoped delta: [`specs/us-7/`](../us-7/) — **not started**

- [ ] Cross-fade / weights + optional bake-blend clip

### US-8 — Morph-target editing

Scoped delta: [`specs/us-8/`](../us-8/) — **not started**

- [ ] Influence sliders + morph keyframes + export tracks

### US-9 — Graph / curve keyframe UI

Scoped delta: [`specs/us-9/`](../us-9/) — **not started**

- [ ] Track list / graph; edit add delete keys; rebind mixer

### US-10 — Full undo / redo

Scoped delta: [`specs/us-10/`](../us-10/) — **not started**

- [ ] Command stack; shortcuts; mixer-safe undo/redo
