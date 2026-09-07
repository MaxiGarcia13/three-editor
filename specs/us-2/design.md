# US-2 design

## Scope

Clip library + playback on the loaded character. No trim, speed UI, keyframes, or export.

## Structure

- `animation` domain: clip library state, mixer lifecycle, playback controls in sidebar
- `viewport` continues to own the character scene graph; mixer roots on that graph
- Animation file meshes are not shown — extract `AnimationClip`s only

## Import path

1. User selects one or more `.glb` / `.gltf` files
2. Adapter loads each file; collect `animations` arrays into library entries (stable id + display name + clip)
3. Validate track target names against the loaded character skeleton / node map
4. On mismatch: keep clip out of “playable” set (or mark errored) and show explicit error — do not retarget

## Mixer

- One `AnimationMixer` on the character root
- Switching active clip stops the previous action and plays the new one
- Loop toggle maps to action loop mode
- Scrubber writes mixer time while paused or while seeking; avoid React state updates every frame — ref for clock, state for labelled time when needed

## UI

- Sidebar: multi-file animation upload, clip list / dropdown, Play / Pause / Stop, loop, scrubber
- Disable playback controls until a character is loaded and at least one valid clip exists

## Non-goals

No second mixer, no debug pose overlay, no automatic Mixamo name rewriting.
