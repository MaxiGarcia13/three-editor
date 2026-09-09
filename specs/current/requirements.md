# Requirements — current

Living product contract for the **GLB Character & Animation Editor**.

## Product summary

Web editor with a full-screen 3D viewport and a collapsible sidebar. Users load one or more model GLBs (one previewed at a time), import animation clips, play and edit them (trim, speed, keyframes), and download a zip of per-model GLBs plus animation-only files.

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
- [x] Sidebar library lists each clip with Replace (re-pick file for that entry) and Remove
- [x] Dropdown (or equivalent) in the preview chrome selects the active clip
- [x] Playback controls: Play, Pause, Stop, loop toggle
- [x] Timeline scrubber stays tied to `THREE.AnimationMixer` time
- [x] Clips that do not match the character skeleton (missing tracks / unknown bones) show a user-visible error — no silent retargeting

### US-3 — Clip trim & time scale

As an editor user, I can shorten a clip and change playback speed.

**Acceptance**

- [x] Start Time / End Time inputs trim the **working** copy of the active clip into a `[start, end]` window (track `trim` + time shift + duration on a clone — `AnimationClip.trim()` is a no-arg internal helper in three 0.185)
- [x] Trim always clones first so the pre-trim clip remains recoverable in the session
- [x] Speed multiplier slider drives `mixer.timeScale` for playback
- [x] Export bake behavior for time scale is defined in design and followed when US-5 ships

### US-4 — Keyframe edit

As an editor user, I can pause on the timeline, move a selected bone/mesh, and save a keyframe at that time.

**Acceptance**

- [x] User can pause at an arbitrary timestamp (scrub or pause during play)
- [x] Raycast selects a bone or mesh; TransformControls move the selection
- [x] “Hold Pose to End” and “Restore Pose” appear in the preview only after the selection’s local pose has been edited (TransformControls); hold captures local position / rotation / scale
- [x] Hold finds or creates the matching `VectorKeyframeTrack` / `QuaternionKeyframeTrack` on the **active** clip and writes a plateau from the clip-local playhead through clip duration so the pose holds for the rest of the animation; timestamp is timeline playhead (`[0, duration]`), not raw accumulated `mixer.time`. Re-edit later by scrubbing and holding again
- [x] Restore discards the unsaved gizmo edit and re-applies the active clip at the current playhead

### US-5 — Zip export

As an editor user, I can download a zip of each model and of each animation as separate files.

**Acceptance**

- [x] “Download” uses `GLTFExporter` and builds a zip in the browser — no server round-trip
- [x] Zip contains one `{model}.glb` per loaded model: that model’s scene plus **only** library clips that validate against that model’s skeleton (working / trimmed / keyed form)
- [x] Zip contains one `{clip}.glb` per library clip that has a working `AnimationClip` — animation-only, no mesh
- [x] Current playback `timeScale` is baked into exported track times / clip duration per design
- [x] Filename collisions inside the zip get a numeric suffix
- [x] Download is disabled or errors when there is nothing to pack; exporter failure does not download a partial zip

### US-11 — Model library

As an editor user, I can keep several character GLBs in the session and choose which one the viewport shows.

**Acceptance**

- [x] User can upload multiple `.glb` / `.gltf` files that each contain a skinned mesh and skeleton; they populate a model library
- [x] Sidebar library lists each model with Replace and Remove (same `AssetEntry` pattern as clips)
- [x] Exactly one model is **previewed** at a time; switching it swaps the viewport graph, re-frames the camera, rebinds the mixer, and re-validates the shared clip library
- [x] Removing the previewed model selects another loaded model, or empty state if none remain
- [x] Clip import still requires a previewed model

### US-13 — Selection name overlay

As an editor user, when I click a bone or part of the model, I can see its name in a floating label on the preview so I know what is selected.

**Acceptance**

- [x] When a bone or mesh is selected via raycast selection, a floating label on the preview shows that object’s `Object3D.name`
- [x] The label updates when the selection changes and is hidden when there is no selection
- [x] The overlay is non-interactive (`pointer-events-none`) and does not block orbit, picking, or the transform-mode toolbar

## Open deltas (not started)

Deltas under `specs/us-<n>/`. Do not implement until explicitly kicked off.

### US-12 — Rename library entries

As an editor user, I can rename a model or animation in the library so labels and exported filenames match what I intend.

**Acceptance**

- [ ] Rename model and clip library entries; labels update in sidebar and clip selector
- [ ] Stable entry ids; clip rename syncs embedded `AnimationClip.name`; zip basenames follow renames
- [ ] Empty names rejected; clip `sourceFile` provenance unchanged

See [`specs/us-12/`](../us-12/).

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
