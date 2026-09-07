# Requirements — current

Living product contract for the **GLB Character & Animation Editor**.

## Product summary

Web editor with a full-screen 3D viewport and a collapsible sidebar. Users load a model GLB, import animation clips, play and edit them (trim, speed, keyframes), and download a single edited `.glb`.

**Stack:** Astro shell + React island; React Three Fiber + drei + Three.js.

## User stories

### US-1 — Model load & viewport

As an editor user, I can upload a model and view it in a full-screen 3D viewport.

**Acceptance**

- [x] User can upload one `.glb` or `.gltf` that contains a skinned mesh and skeleton
- [x] Model appears in a full-screen R3F viewport with orbit / pan / zoom
- [x] Empty state when no model is loaded; clear error when load fails or skeleton is missing
- [x] Sidebar chrome is present and collapsible (shell may be minimal until later US)

### US-2 — Animation library & playback

As an editor user, I can import animation files into a clip library and play them on the loaded character.

**Acceptance**

- [x] User can upload multiple separate `.glb` / `.gltf` files; their clips populate an animation library
- [x] Dropdown (or equivalent) selects the active clip
- [x] Playback controls: Play, Pause, Stop, loop toggle
- [x] Timeline scrubber stays tied to `THREE.AnimationMixer` time
- [x] Clips that do not match the character skeleton (missing tracks / unknown bones) show a user-visible error — no silent retargeting

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

## Post-MVP user stories

Deltas exist under `specs/us-6/` … `specs/us-10/`. Not started; do not implement until explicitly kicked off (typically after US-1…US-5 ship).

### US-6 — Cross-rig retargeting

As an editor user, I can apply an animation authored for a different rig to my loaded character via an explicit retarget mapping.

**Acceptance**

- [ ] Retarget flow when imported tracks do not match the character skeleton
- [ ] Mapping is explicit (suggestions OK; silent remap forbidden)
- [ ] Vendor prefixes only via a documented registry
- [ ] Retargeted clips become playable working clips; failures do not corrupt pose

### US-7 — Multi-clip blending

As an editor user, I can blend or cross-fade between animation clips on the loaded character.

**Acceptance**

- [ ] At least two concurrent actions or an A→B cross-fade
- [ ] User-controllable weights or fade duration
- [ ] Live viewport update; export contract defined (bake blend on demand)

### US-8 — Morph-target editing

As an editor user, I can adjust morph target influences and save them as animation keyframes.

**Acceptance**

- [ ] Morph list + influence sliders when morphs exist
- [ ] Live updates; save morph keyframes at `mixer.time` on the active clip
- [ ] Empty state without morphs; export includes morph tracks when present

### US-9 — Graph / curve keyframe UI

As an editor user, I can inspect and edit keyframe curves for tracks on the active clip.

**Acceptance**

- [ ] Track list (filterable by selection); edit / add / delete keyframes
- [ ] Edits update the working clip and mixer; interpolation visible where supported

### US-10 — Full undo / redo

As an editor user, I can undo and redo animation edits within the session.

**Acceptance**

- [ ] Undo / Redo UI + shortcuts for discrete clip mutations (trim, keyframes, …)
- [ ] Per-session stack; mixer never left on a stale clip; integrates with or replaces US-3 pre-trim restore

## Non-functional requirements

- **NFR-1 Modular domains:** Logic lives under `src/modules/<domain>/` (`editor-shell`, `viewport`, `animation`, `export`); pages stay thin
- **NFR-2 Layering:** No Three.js / R3F / Tailwind inside pure `services/` or `utils/`
- **NFR-3 Island boundary:** Canvas and editor interactivity hydrate as a client React island; Astro owns the static shell
- **NFR-4 Accessibility:** Sidebar controls are keyboard-operable and properly labelled
- **NFR-5 Asset contract:** Bone-name mismatch is an explicit error; no hardcoded vendor prefixes without a registry

## Out of scope (still excluded)

- Material / texture editing
- Server-side processing or accounts
- Collaborative editing / durable undo across reloads
- Full NLA strip editorial beyond US-7 blend/cross-fade
