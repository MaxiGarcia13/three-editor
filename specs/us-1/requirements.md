# US-1 — Model load & viewport

Delta for the first shippable slice. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

## Story

As an editor user, I can upload a model and view it in a full-screen 3D viewport.

## Acceptance

- [ ] User can upload one `.glb` or `.gltf` that contains a skinned mesh and skeleton
- [ ] Model appears in a full-screen R3F viewport with orbit / pan / zoom
- [ ] Empty state when no model is loaded; clear error when load fails or skeleton is missing
- [ ] Sidebar chrome is present and collapsible (minimal shell OK)

## Out of scope for this delta

- Animation import / playback
- Trim, speed, keyframes, export
