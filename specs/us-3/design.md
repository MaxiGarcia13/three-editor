# US-3 design

## Scope

Trim working clips and live playback speed. Export baking stays documented for US-5.

## Trim flow

1. User sets Start Time / End Time on the active library entry (clamped to clip duration)
2. Clone the working clip (never mutate the only remaining original)
3. Call `trim(start, end)` on the clone
4. Replace the library entry’s working clip; retain a session reference to the pre-trim clip for restore
5. Rebind the mixer action to the trimmed clip; reset scrubber range to new duration

## Time scale

- Sidebar speed multiplier → `mixer.timeScale` only
- Scrubber and labelled time remain in clip-local seconds (mixer time), not wall-clock-adjusted labels unless clearly documented in UI copy
- Do **not** bake tracks in this delta

## UI

- Start / End numeric inputs (and optional dual-range if kept simple)
- “Restore pre-trim” (or equivalent) while a pre-trim snapshot exists for that entry
- Speed slider with a sensible default of `1`

## Non-goals

No destructive trim without clone; no writing export files yet.
