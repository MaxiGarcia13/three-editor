# US-11 design

## Scope

Session-level **model library** with one previewed character in the viewport. Shared clip library from US-2 is unchanged except that validation follows the previewed skeleton.

## Model library

- Store holds `models[]` plus `activeModelId` (the previewed entry)
- Viewport still consumes a single `scene` — the active model’s graph
- First successful load becomes previewed; later loads append without replacing the preview unless the user selects them
- Replace updates **that** entry only (keep the entry id). If it was previewed, swap the viewport graph and re-frame. If it was not, leave the preview untouched
- Remove drops the entry and disposes its scene graph / blob URL. If it was previewed, select another loaded model or idle empty state

Failed loads (parse error, missing skinned mesh / skeleton) do not add a broken entry; user-visible error copy, same as US-1.

## Preview switch

1. User selects a library row as previewed
2. Mount that model’s scene in the viewport; dispose is **not** required for other library graphs (they stay in memory until Remove)
3. Camera frames the new model AABB (same framing contract as US-1)
4. Mixer rebinds to the new root; playback stops; `syncClipsToSkeleton` re-validates every shared clip against the new node/bone map
5. Active clip stays if it is still `ready` on the new skeleton; otherwise select the next ready clip or clear selection

## Sidebar

Mirror clip import + library:

- Multi-file “Load Model” control
- List of models with Replace / Remove
- Previewed row is visually distinct; selecting a row (or an explicit preview control) sets `activeModelId`

Clip import stays disabled until a model is previewed.

## Layering

- `viewport` owns the model library store, loader adapter, and framing
- `animation` already re-validates via `syncClipsToSkeleton` — wire it on active-model change
- No Three / R3F / Tailwind in pure services

## Non-goals

No zip export in this delta. No per-model clip assignment. Do not keep a second hidden canvas for non-previewed models.
