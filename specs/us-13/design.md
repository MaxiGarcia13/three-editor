# US-13 design

## Scope

HTML overlay in the preview chrome that reflects `$selection.object` — no new picking path.

## Placement

- Mount beside existing preview overlays in `EditorPreview` (sibling of `TransformModeToolbar` / `ViewportStatusOverlay`)
- Position: **top-right** of the canvas region (`absolute top-… right-…`), with the same mobile top offset pattern used for the transform toolbar so it clears shell chrome
- `pointer-events-none`; `z-index` aligned with other preview HUDs so it stays visible above the canvas but does not steal input

## Label source

| Pick            | Label                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Bone (`isBone`) | `boneDisplayName(object.name)` from `animation/services/bone-registry`; if that differs from raw, set `title` to the raw name |
| Mesh / other    | `object.name` if non-empty; else a fixed fallback string (“Unnamed”)                                                          |

Reuse `boneDisplayName` rather than hardcoding vendor prefixes in the viewport UI (NFR-5).

## Data flow

1. User picks via existing `use-raycast-selection` → `selectObject` / `clearSelection`
2. Overlay subscribes to `$selection` (`object`)
3. Derive label from the selected `Object3D`; render `Text` (or equivalent) when non-null

No store shape change required unless a derived “selection label” atom is preferred for testing — optional, not required.

## Non-goals

World-space CSS2D/HTML labels, rename, hover-only tooltips, selection highlighting.
