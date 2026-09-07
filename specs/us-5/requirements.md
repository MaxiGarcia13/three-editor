# US-5 — Zip export

Delta for downloading each model and each animation as separate files in one zip. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-11 (model library); US-2 (clip library). Should honor US-3 trim/speed and US-4 keyframes when those shipped.

## Story

As an editor user, I can download a zip of each model and of each animation as separate files.

## Acceptance

- [ ] “Download” uses `GLTFExporter` and builds a zip in the browser — no server round-trip
- [ ] Zip contains one `{model}.glb` per loaded model: that model’s scene plus **only** library clips that validate against that model’s skeleton (working / trimmed / keyed form)
- [ ] Zip contains one `{clip}.glb` per library clip that has a working `AnimationClip` — animation-only, no mesh
- [ ] Current playback `timeScale` is **baked** into exported track times / clip duration per [`specs/current/design.md`](../current/design.md)
- [ ] Filename collisions inside the zip get a numeric suffix
- [ ] Download is disabled or errors when there is nothing to pack; exporter failure does not download a partial zip

## Out of scope for this delta

- Server upload, cloud save, format conversion beyond GLB
- Exporting materials/textures edits (none in MVP)
- Per-row download buttons or a leftover “one combined GLB” option
- Partial clip picker (every working clip is packed as its own animation-only file; each model gets the clips that match its skeleton)
