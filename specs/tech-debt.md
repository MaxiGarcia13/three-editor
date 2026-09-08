# Tech debt

Internal cleanup. No changelog unless user-visible product changed. Tick only after the change is in.

Do not start post-MVP stories (US-6…US-10) from this file.

## Dead code

- [x] Remove unused `loadModel` in `src/modules/viewport/stores/model-store.ts` (alias of `importModelFiles([file])`) and drop it from `src/modules/viewport/index.ts`
- [x] Remove unused `resetModel` (clears the whole library; no caller) and drop it from the viewport barrel
- [x] Remove unused `getActiveMixer` in `src/modules/animation/services/mixer-session.ts` (`setActiveMixer` stays)

## Unused public barrels

Callers already use deep paths. Trim unused re-exports; do not migrate imports unless a later change needs the barrel.

- [ ] `src/modules/viewport/index.ts` — nothing imports `@/modules/viewport`; keep only symbols that should be the module’s public API, or delete the barrel if it stays unused
- [ ] `src/modules/animation/index.ts` — editor-shell only imports `ClipSelector`, `PlaybackControls`, `useClipTimelineScrubber`, `SaveKeyframeButton`, `ClipTrimInputs`, `SpeedControl`. Drop the rest from the barrel (`ClipImport`, `ClipLibrary`, `$clips`, playback/store actions, …). Those symbols stay via `stores/clip-store` / component files
- [ ] `src/components/timeline-scrubber/index.ts` — export `TimelineScrubber` (and props type if needed). Keep `durationToFrameCount` / `frameToTime` / defaults private to the package

## Duplicated patterns

Not copy-pasted files. Extract only if the helper stays small.

- [ ] Shared GLB parse helper for `loadModelFromFile` and `loadClipsFromFile` (extension check, blob URL, `GLTFLoader` Promise). Keep domain validation in each adapter
- [ ] `replaceClip` should call `toEntry()` instead of inlining the same `ClipEntry` shape
- [ ] `CollapsibleAside`: the closed path already returns `OpenButton`, so `[marginDirection]: sidebarOpen ? 0 : calc(-1 * width)` never runs. Remove the dead branch, or finish the slide animation

## Not debt

- Timeline lives in `src/components/timeline-scrubber/` only (the animation-module copy is gone)
- `ModelLibrary` / `ClipLibrary` composing `AssetEntry` + `useGltfFilePicker` is reuse
- `SpeedControl` native range vs `Input` is intentional (slider + `1.0x` readout)
- Camera, grid, axes, selection, GLTF, and timeline constants each have a single owner
