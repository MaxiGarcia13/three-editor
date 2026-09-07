# US-5 design

## Scope

Client-side pack + download of character scene + working animation clips.

## Export flow

1. User clicks “Download Edited GLB”
2. Collect character root Object3D (as loaded / displayed)
3. Collect every library entry’s **working** `AnimationClip` (trimmed / keyed state)
4. If `mixer.timeScale !== 1`, bake speed into a clone of each clip (scale keyframe times and clip duration) so external viewers play at the edited speed without runtime `timeScale`
5. `GLTFExporter.parse` with `binary: true` and `animations: [...]`
6. Trigger browser download of the `.glb` blob

## Domain

- `export` module owns exporter adapter + download helper
- Baking lives in `animation` services/utils (or shared export prep) — no Tailwind/R3F in pure bake helpers
- Sidebar button in `editor-shell` calls export use-case

## Failure modes

- No character → disable button or error
- Exporter failure → user-visible error; do not download a partial file

## Non-goals

No round-trip to a backend; no separate “export selected clips only” UI in MVP.
