# US-14 — Viewport general settings (axes)

Delta for show/hide world axes and axes length (metres) from Settings. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-1 (viewport + world axes).

## Story

As an editor user, I can show or hide the world axes and change how far the metre rulers extend from the Settings sidebar.

## Acceptance

- [ ] Settings sidebar (`editor-settings-sidebar`) has a **General** section above Animation
- [ ] General includes a checkbox to show/hide world XYZ axes (and X/Y metre rulers)
- [ ] General includes a numeric control for axes length in metres
- [ ] Toggling visibility mounts/unmounts axes in the viewport immediately
- [ ] Changing length updates `axesHelper` and X/Y rulers live
- [ ] Defaults match current behavior: axes visible, length `10`
- [ ] Settings are session-only (no persistence across reloads)

## Out of scope for this delta

- Ground grid toggle
- Major/minor tick step editing
- Unit system changes (always metres)
- Persisting settings to localStorage or disk
