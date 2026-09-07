# US-11 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [ ] Confirm US-1 load / empty / error paths still work on a single model
- [ ] Confirm `syncClipsToSkeleton` is the clip re-validate entry point on character change

## Implement

- [x] Model store: `models[]` + `activeModelId`; viewport still reads one `scene`
- [x] Multi-file model import; failed files do not join the library
- [x] Sidebar model list with Replace / Remove and a clear previewed state
- [x] Switching preview: swap viewport graph, re-frame camera, rebind mixer, `syncClipsToSkeleton`
- [x] Remove previewed model → next loaded model or empty overlay
- [ ] Clip import remains gated on a previewed model

## Verify

- [ ] All US-11 acceptance criteria in [`requirements.md`](./requirements.md) pass
- [ ] Two (or more) models in the library; only the previewed one is visible; clips re-validate on switch
- [ ] No export / zip work left half-wired in this delta
