# US-11 — Model library

Delta for keeping several character GLBs in the session and previewing one. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-1 (viewport + model load). Extends the shipped one-model session; clip library stays shared (US-2).

## Story

As an editor user, I can keep several character GLBs in the session and choose which one the viewport shows.

## Acceptance

- [ ] User can upload multiple `.glb` / `.gltf` files that each contain a skinned mesh and skeleton; they populate a model library
- [ ] Sidebar library lists each model with Replace (re-pick file for that entry) and Remove — same `AssetEntry` pattern as clips
- [ ] Exactly one model is **previewed** at a time; switching it swaps the viewport graph, re-frames the camera, rebinds the mixer, and re-validates the shared clip library against the new skeleton
- [ ] Removing the previewed model selects another loaded model, or empty state if none remain
- [ ] Clip import still requires a previewed model (no silent import against a missing skeleton)

## Out of scope for this delta

- Export / zip download (US-5)
- Per-model clip lists (clips stay one shared library)
- Retargeting when a clip mismatches a given model (US-6)
