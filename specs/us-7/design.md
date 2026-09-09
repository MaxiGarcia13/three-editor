# US-7 design

## Scope

Weighted blend and/or cross-fade between clips via `AnimationMixer` / `AnimationAction`.

## Confirmed baseline (US-2)

The US-2 mixer is strictly single-action; this is the starting point US-7 extends.

- `mixer-session.ts` tracks one `currentAction`, created per scene mount in `useClipMixerMount`
- Switching clips in `useClipMixerAction` stops the previous action before `clipAction()` on the new one
- Scrub (`setMixerTime`), time scale, bind suspend/resume, and rest-pose restore all route through that single `currentAction`
- No other caller creates a concurrent action

So the dual-action work must first relax the single-action assumptions in `mixer-session.ts` (stop-old-before-play-new, single-action suspend/resume).

## Approach

- Extend playback beyond single active action: secondary action + `crossFadeTo` / `setEffectiveWeight`
- Sidebar: select clip A / B (or from→to), fade duration, optional weight sliders
- Blend playback stays viewport-only until the user explicitly requests a bake (see **Export contract (locked)**)

## Export contract (locked)

Blended playback is viewport-only. When the user requests **Bake blend**, produce one new library `AnimationClip` from the active blend, then export it through the existing US-5 zip packing as a `{clip}.glb` like any trim/keyframe working clip.

- Bake samples the concurrent actions at their current weights / fade across the target duration and writes one `AnimationClip` (reuse the existing trim/scale bake path)
- Trade-off with discrete clips is chosen: **no hidden runtime weight metadata is ever written to GLB**; without an explicit Bake blend, export stays discrete library clips
- Playing cross-fades are folded into the baked result at the destination weight (A→B fade ends at B = 1.0)

## Non-goals

No full NLA timeline with layered strips and per-bone masks in this story (may be a later delta if needed).
