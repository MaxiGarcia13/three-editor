# US-7 design

## Scope

Weighted blend and/or cross-fade between clips via `AnimationMixer` / `AnimationAction`. Active clips (imported or new) can blend/fade with other library clips in the viewport; bake is explicit.

## Confirmed baseline (US-2)

The US-2 mixer is strictly single-action; this is the starting point US-7 extends.

- `mixer-session.ts` tracks one `currentAction`, created per scene mount in `useClipMixerMount`
- Switching clips in `useClipMixerAction` stops the previous action before `clipAction()` on the new one
- Scrub (`setMixerTime`), time scale, bind suspend/resume, and rest-pose restore all route through that single `currentAction`
- No other caller creates a concurrent action

So the dual-action work must first relax the single-action assumptions in `mixer-session.ts` (stop-old-before-play-new, single-action suspend/resume).

## Approach

### Authorship model (locked)

- Library **Animations** **New animation** (`PlusIcon`) creates a new `status: 'draft'` clip from scratch (default duration: 1s)
- Drafts and imported ready clips are editable when active: Start/End, Speed, keyframes (writes only mutate the active clip)
- **Selection:** click an Animations list row (same pattern as models). Clicking the currently selected clip clears to T-pose. No Active Clip dropdown
- Settings: Start/End and Speed always visible; **Blend** is a reusable `Collapsible` section with partner select, weight, fade, **Bake**, and **Reset**
- Blend/fade is **viewport-only** until **Bake** writes into the active clip and resets the form; **Reset** clears the form without writing
- Unsaved bone/gizmo edits discard on reselect; **Hold Pose to End** commits into the active clip

### Playback API

- `$clips`: `blendClipId`, `blendWeight`, `blendFadeDuration`, `blendBaseClip`
- Primary action = active clip (or `blendBaseClip` while blending); secondary = blend clip
- Weights snap instantly on the slider; Fade (s) is stored for intentional fade timing (not applied on every weight drag)
- Weights via mixer `setEffectiveWeight` (not `crossFadeTo` + `setEffectiveWeight`)
- `isReadyClip` treats draft entries with clip data as playable/editable (`status !== 'error'`)

### UI

- `ClipLibrary` list selection + Draft/Blend labels
- `ClipNewAnimation` with `PlusIcon`
- Reusable `Collapsible` (`src/components/collapsible/`) wraps Blend in Settings
- Playback bar: controls + scrubber only

## Export contract (locked)

Blend/fade is viewport playback until Bake. Export stays discrete library clips (no hidden runtime weight metadata in GLB). Baked/keyframed edits on a clip are part of that clip’s data and export with it.

## Non-goals

No full NLA timeline with layered strips and per-bone masks in this story.
