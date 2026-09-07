# Requirements — current

Living product contract for the **GLB Character & Animation Editor**.

## Product summary

Web editor with a full-screen 3D viewport and a collapsible sidebar. Users load a character GLB, import animation clips, play and edit them (trim, speed, keyframes), and download a single edited `.glb`.

**Stack:** Astro shell + React island; React Three Fiber + drei + Three.js.

## User stories

### US-1 — Character load & viewport

As an editor user, I can upload a character model and view it in a full-screen 3D viewport.

**Acceptance**

- [ ] User can upload one character `.glb` or `.gltf` that contains a skinned mesh and skeleton
- [ ] Model appears in a full-screen R3F viewport with orbit / pan / zoom
- [ ] Empty state when no character is loaded; clear error when load fails or skeleton is missing
- [ ] Sidebar chrome is present and collapsible (shell may be minimal until later US)

### US-2 — Animation library & playback

As an editor user, I can import animation files into a clip library and play them on the loaded character.

**Acceptance**

- [ ] User can upload multiple separate `.glb` / `.gltf` files; their clips populate an animation library
- [ ] Dropdown (or equivalent) selects the active clip
- [ ] Playback controls: Play, Pause, Stop, loop toggle
- [ ] Timeline scrubber stays tied to `THREE.AnimationMixer` time
- [ ] Clips that do not match the character skeleton (missing tracks / unknown bones) show a user-visible error — no silent retargeting

### US-3 — Clip trim & time scale

As an editor user, I can shorten a clip and change playback speed.

**Acceptance**

- [ ] Start Time / End Time inputs trim the **working** copy of the active clip via `AnimationClip.trim()`
- [ ] Trim always clones first so the pre-trim clip remains recoverable in the session
- [ ] Speed multiplier slider drives `mixer.timeScale` for playback
- [ ] Export bake behavior for time scale is defined in design and followed when US-5 ships

### US-4 — Keyframe edit

As an editor user, I can pause on the timeline, move a selected bone/mesh, and save a keyframe at that time.

**Acceptance**

- [ ] User can pause at an arbitrary timestamp (scrub or pause during play)
- [ ] Raycast selects a bone or mesh; TransformControls move the selection
- [ ] “Save Keyframe at Current Time” captures local position / rotation / scale
- [ ] Button finds or creates the matching `VectorKeyframeTrack` / `QuaternionKeyframeTrack` on the **active** clip and inserts or updates keyframes at `mixer.time`

### US-5 — Export edited GLB

As an editor user, I can download one `.glb` containing the character and all edited clips.

**Acceptance**

- [ ] “Download Edited GLB” uses `GLTFExporter`
- [ ] File packs the character model plus all modified, trimmed, and newly keyed `AnimationClip`s
- [ ] Download works in a modern desktop browser without a server round-trip

## Non-functional requirements

- **NFR-1 Modular domains:** Logic lives under `src/modules/<domain>/` (`editor-shell`, `viewport`, `animation`, `export`); pages stay thin
- **NFR-2 Layering:** No Three.js / R3F / Tailwind inside pure `services/` or `utils/`
- **NFR-3 Island boundary:** Canvas and editor interactivity hydrate as a client React island; Astro owns the static shell
- **NFR-4 Accessibility:** Sidebar controls are keyboard-operable and properly labelled
- **NFR-5 Asset contract:** Bone-name mismatch is an explicit error; no hardcoded vendor prefixes without a registry

## Out of scope (MVP)

- Cross-rig retargeting
- Multi-clip blending / NLA
- Morph-target or material / texture editing
- Full undo/redo beyond session clip clone for trim
- Server-side processing or accounts
