# US-5 — Export edited GLB

Delta for downloading the character plus all edited clips. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-1 (character); US-2 (clip library). Should honor US-3 trim/speed and US-4 keyframes when those shipped.

## Story

As an editor user, I can download one `.glb` containing the character and all edited clips.

## Acceptance

- [ ] “Download Edited GLB” uses `GLTFExporter`
- [ ] File packs the character model plus all modified, trimmed, and newly keyed `AnimationClip`s
- [ ] Download works in a modern desktop browser without a server round-trip
- [ ] Current playback `timeScale` is **baked** into exported track times / clip duration per [`specs/current/design.md`](../current/design.md)

## Out of scope for this delta

- Server upload, cloud save, format conversion beyond GLB
- Exporting materials/textures edits (none in MVP)
- Partial clip export picker (export all library working clips)
