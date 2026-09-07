# US-8 design

## Scope

Morph target (blend shape) inspection, live influence, and keyframe write onto the active clip.

## Approach

1. Detect `morphTargetDictionary` / influences on character meshes after load
2. Sidebar panel binds sliders to influences (ref-friendly updates; avoid full React re-render per drag if possible)
3. “Save morph keyframe at current time” writes `NumberKeyframeTrack`s named for the morph influences onto the active working clip
4. Rebind mixer action; ensure export packs morph tracks with the character

## Non-goals

No sculpting new morph targets; no material/texture authoring.
