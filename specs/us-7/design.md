# US-7 design

## Scope

Weighted blend and/or cross-fade between clips via `AnimationMixer` / `AnimationAction`, authored into a **new blank library clip** so source animations are never the write target.

## Confirmed baseline (US-2)

The US-2 mixer is strictly single-action; this is the starting point US-7 extends.

- `mixer-session.ts` tracks one `currentAction`, created per scene mount in `useClipMixerMount`
- Switching clips in `useClipMixerAction` stops the previous action before `clipAction()` on the new one
- Scrub (`setMixerTime`), time scale, bind suspend/resume, and rest-pose restore all route through that single `currentAction`
- No other caller creates a concurrent action

So the dual-action work must first relax the single-action assumptions in `mixer-session.ts` (stop-old-before-play-new, single-action suspend/resume).

## Approach

### Authorship model (locked)

- Library **Animations** gains a **New animation** control (`PlusIcon`, beside import) that appends a **blank draft** clip and selects it for authoring
- The draft is the only write target: user picks source clips to blend/fade **into** it, edits draft timing, and saves one result
- Draft entries carry `status: 'draft'` with `clip: null`; `isReadyClip()` excludes them, so every existing write path (trim, keyframe, replace, bake) can only ever mutate a ready/draft entry it owns — never another library clip
- `startNewAnimation(scene)` appends the blank draft, selects it (rest pose in the mixer), and resets blend/playback state
- Source clips stay read-only (no weight/trim mutations on Walk/Idle/etc.)
- Live dual-action preview plays while the draft is active; Settings trim/speed apply to the draft, not to overlaying an arbitrary existing active clip

### Playback API (implemented — keep; rewire call sites to draft)

- `$clips` gains `blendClipId` + `blendWeight` (0..1) + `blendFadeDuration`; handlers `setBlendClip(id | null)` / `setBlendWeight(w)` / `setBlendFadeDuration(s)` in `clip-store`
- `mixer-session` owns a **secondary action**: primary keeps `setEffectiveWeight(1 - weight)`, blend gets `weight`; suspend/resume/restore and `setMixerTime` cover both actions. Weight changes flush `mixer.setTime(t)` so paused previews update (frame loop only advances while playing)
- **Weight changes** lerp via `fadeBlendWeightTo` over `blendFadeDuration` — do **not** use `AnimationAction.crossFadeTo` together with `setEffectiveWeight` (that leaves total weight < 1 and blends toward bind / rest pose)
- `useClipMixerBlend` mounts/stops the secondary action, snaps both actions to one playhead, and mirrors `blendWeight` and loop mode
- Library hygiene: removing / replacing / invalidating the blend clip clears `blendClipId` so it never dangles

### UI pivot (from Settings Bake blend)

- **Superseded:** Settings `BlendControls` + **Bake blend** button that baked the overlay on whatever clip was active
- **Replace with:** New animation in `EditorLibrarySidebar` → draft selected → blend/time controls author into that draft → save produces one ready library clip
- Icon for New animation: existing `PlusIcon` (`src/components/icons/plus-icon.tsx`), same header action pattern as `ClipImport` / `UploadIcon`

## Export contract (locked)

Blended playback is viewport-only until the draft is saved. Saving the draft produces one library `AnimationClip`, then export flows through the existing US-5 zip packing as a `{clip}.glb` like any trim/keyframe working clip.

- Save/bake samples the concurrent source actions at their current weights / fade across the draft duration and writes one `AnimationClip` into the draft entry (reuse `bakeBlendClip()` / trim-scale bake path as needed)
- Trade-off with discrete clips is chosen: **no hidden runtime weight metadata is ever written to GLB**; without an explicit save of the draft, export stays discrete library clips
- Playing cross-fades are folded into the baked result at the destination weight (A→B fade ends at B = 1.0)

## Non-goals

No full NLA timeline with layered strips and per-bone masks in this story (may be a later delta if needed).
