# US-20 — Multi-model preview + per-model clips

Delta for rendering multiple models in the preview with independent owned-clip selection, and shared-clip broadcast playback. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-19 (nested library + ownership). Do not start until US-19 ships (or both are explicitly kicked off together).

## Story

As an editor user, I can preview two or more models at once, each playing a different owned animation; selecting a shared animation plays that clip on all models and clears per-model selections.

## Acceptance

- [ ] Viewport can show more than one loaded model at a time (spaced layout)
- [ ] Each model can have its own selected **owned** clip playing
- [ ] Selecting a **shared** clip plays that clip on **all** models and clears per-model owned selections
- [ ] Selecting an owned clip under a model does not clear other models’ owned selections
- [ ] Playback / mixer works per model (no single-mixer-only limitation for multi-model)

## Out of scope for this delta

- Nested library / ownership itself (US-19)
- Morphs, curve UI, undo (US-8…US-10)
