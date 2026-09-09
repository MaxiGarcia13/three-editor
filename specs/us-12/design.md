# US-12 design

## Scope

Inline rename for model and clip library rows. Names drive UI labels and US-5 zip basenames; clip rename also syncs Three.js `AnimationClip.name`.

## Data

| Entry        | Field today                                             | Rename mutates                                                                                                |
| ------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `ModelEntry` | `fileName` (from upload)                                | `fileName` only; keep `id`, `blobUrl`, `scene`                                                                |
| `ClipEntry`  | `name` (from `AnimationClip.name` or failed-file label) | `name`; if `clip` / `sourceClip` exist, set `.name` to the same string; keep `id`, `sourceFile`, status/error |

Stable `id` is the selection key everywhere (`setActiveModel`, `selectClip`, replace, retarget). Do not rebuild ids from the new name.

## Store API

- `renameModel(id, name)` in `viewport` model store — trim; no-op if empty or unknown id
- `renameClip(id, name)` in `animation` clip store — same rules; update embedded clip names when non-null

No adapter / loader changes. Import still seeds names from file / clip as today.

## UI

- Extend shared `AssetEntry` with an optional rename affordance (e.g. double-click label and/or a “Rename” control that swaps the label for an input)
- Commit on Enter / blur; Escape cancels and restores the prior label
- Finder-style selection: select basename only when the label ends in `.glb`/`.gltf`; leave the suffix in the field so it stays editable
- If commit omits the extension entirely, restore the previous `.glb`/`.gltf`; a user-typed suffix (including switching `.glb` ↔ `.gltf`) is kept as typed
- Wire from `ModelLibrary` and `ClipLibrary` to the store handlers
- Active-clip `<select>` already binds `entry.name` — no separate rename UI there

Reuse existing `Input` / `Button` patterns; keep Replace / Remove / Retarget actions unchanged.

## Export

No new export paths. `packModelGlb` / `packClipGlb` already derive filenames from `model.fileName` and `entry.name` via `stripGlbExtension`. After rename, zip entries follow the new labels; collision suffixes unchanged.

## Non-goals

Bone / node rename, session persistence, undo stack integration, forcing unique library names at edit time.
