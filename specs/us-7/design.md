# US-7 design

## Scope

Weighted blend and/or cross-fade between clips via `AnimationMixer` / `AnimationAction`. Active clips (imported or new) can blend/fade with other library clips in the viewport.

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
- Settings: Start/End and Speed on the active clip; Blend Clip select + Blend weight + Fade **auto-bake into the active clip** (no Save animation button)
- Unsaved bone/gizmo edits discard on reselect; **Hold Pose to End** commits into the active clip

### Playback API

- `$clips`: `blendClipId`, `blendWeight`, `blendFadeDuration`
- Primary action = active clip (including draft); secondary = blend clip
- Weights via `fadeBlendWeightTo` (not `crossFadeTo` + `setEffectiveWeight`)
- `isReadyClip` treats draft entries with clip data as playable/editable (`status !== 'error'`)

### UI

- `ClipLibrary` list selection + Draft/Blend labels
- `ClipNewAnimation` with `PlusIcon`
- `BlendControls` available for any active editable clip (imported or new)
- Playback bar: controls + scrubber only

## Export contract (locked)

Blend/fade is viewport playback. Export stays discrete library clips (no hidden runtime weight metadata in GLB). Keyframed/held edits on a clip are part of that clip’s data and export with it.

## Non-goals

No full NLA timeline with layered strips and per-bone masks in this story.
