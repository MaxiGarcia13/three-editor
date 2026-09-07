# US-7 design

## Scope

Weighted blend and/or cross-fade between clips via `AnimationMixer` / `AnimationAction`.

## Approach

- Extend playback beyond single active action: secondary action + `crossFadeTo` / `setEffectiveWeight`
- Sidebar: select clip A / B (or from→to), fade duration, optional weight sliders
- **Export contract (chosen default):** bake the blended result into one new `AnimationClip` for download when the user requests “Bake blend”; otherwise export remains discrete library clips (no hidden weight metadata)

## Non-goals

No full NLA timeline with layered strips and per-bone masks in this story (may be a later delta if needed).
