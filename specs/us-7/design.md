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
- **Export contract (chosen default):** bake the blended result into one new `AnimationClip` for download when the user requests “Bake blend”; otherwise export remains discrete library clips (no hidden weight metadata)

## Non-goals

No full NLA timeline with layered strips and per-bone masks in this story (may be a later delta if needed).
