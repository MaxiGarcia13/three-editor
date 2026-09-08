# US-5 design

## Scope

Client-side pack + zip download of **per-model** GLBs (mesh + matching clips) and **per-clip** animation-only GLBs.

## Export flow

1. User clicks “Download”
2. If there are no loaded models **and** no working clips → disable the control or show an error; do not download
3. For each loaded model:
   - Collect that model’s scene graph
   - Collect every library entry’s **working** `AnimationClip` that **validates** against that model’s skeleton (do not use the UI `ready` flag, which is relative to the _previewed_ model only)
   - If `mixer.timeScale !== 1`, bake speed into a clone of each packed clip (scale keyframe times and clip duration) so external viewers play at the edited speed without runtime `timeScale`
   - `GLTFExporter.parse` with `binary: true` and `animations: [...]`
   - Add `{modelName}.glb` to the zip (numeric suffix on collision)
4. For each library clip that has a working `AnimationClip` (load succeeded; ignore current preview validation):
   - Bake `timeScale` the same way
   - `GLTFExporter.parse` with `binary: true`, `animations: [that clip]`, and an empty / minimal scene (no character mesh)
   - Add `{clipName}.glb` to the zip (numeric suffix on collision)
5. Trigger a single browser download of the zip blob

A model with no matching clips still ships as a mesh-only `.glb`. A session with clips but no models still ships the animation-only files (if that state is reachable).

## Domain

- `export` module owns exporter adapter, zip helper, filename disambiguation, and download trigger
- Skeleton matching at pack time reuses `animation` validation (or a thin export-prep call into it) — do not duplicate bone-name rules
- Baking lives in `animation` services/utils (or shared export prep) — no Tailwind/R3F in pure bake helpers
- Sidebar button in `editor-shell` calls the export use-case

## Failure modes

- Nothing to pack → disable button or error
- Any exporter or zip failure → user-visible error; do not download a partial archive

## Non-goals

No round-trip to a backend. No per-entry download buttons. No single “combined character + all clips” GLB.
