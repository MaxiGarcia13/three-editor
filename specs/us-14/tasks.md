# US-14 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [x] Confirm `WorldAxes` tick/geometry can be rebuilt from `axesSize` at runtime

## Implement

- [x] `$viewportSettings` store (`axesVisible`, `axesSize`) under `viewport/stores`
- [x] General section in `editor-settings-sidebar.tsx` (checkbox + metres input)
- [x] Conditionally render `WorldAxes` from `axesVisible`
- [x] Drive `WorldAxes` length from `axesSize`; dispose/rebuild geometry on change

## Verify

- [ ] All US-14 acceptance criteria in [`requirements.md`](./requirements.md) pass
