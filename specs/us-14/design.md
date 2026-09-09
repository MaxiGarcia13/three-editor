# US-14 design

## Scope

Viewport axes visibility and length controls in the Settings sidebar General section, backed by a dedicated viewport nanostore.

## Approach

1. Add `$viewportSettings` (`nanostores` `map`) in `viewport/stores/viewport-settings-store.ts` with `{ axesVisible: boolean; axesSize: number }` and setters `setAxesVisible` / `setAxesSize`
2. Defaults: `axesVisible: true`, `axesSize` = current `AXES_SIZE` (`10`); clamp size to a sane range (e.g. `1`–`50`) so ruler tick count (`size / AXES_MINOR_STEP`) stays bounded
3. Host UI in `editor-shell/components/editor-settings-sidebar.tsx`: **General** section above Animation — checkbox + number `Input` for metres (same patterns as trim/speed). Not the library sidebar or preview chrome
4. `ViewportCanvas` renders `<WorldAxes />` only when `axesVisible`
5. `WorldAxes` reads `axesSize` from the store and builds ticks/geometry at runtime (today module-level constants from `AXES_SIZE`); keep major/minor steps from existing constants

```text
editor-settings-sidebar (General)
        → $viewportSettings
                → ViewportCanvas (conditional mount)
                → WorldAxes (dynamic size)
```

## Non-goals

No ground-grid controls, no tick-step UI, no persistence.
