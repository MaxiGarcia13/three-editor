# US-16 — FBX import via convert API

Delta for converting uploaded `.fbx` files to GLB on the server, then reusing the existing GLB load path. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-1 / US-11 (model import + replace); US-2 (clip import + replace).

## Story

As an editor user, I can upload a `.fbx` model or animation file and have it converted to GLB so it loads like any other library asset.

## Acceptance

- [ ] Model import and Replace accept `.fbx` in addition to `.glb` / `.gltf`
- [ ] Clip import and Replace accept `.fbx` in addition to `.glb` / `.gltf`
- [ ] `.fbx` files are converted via `POST /api/fbx-to-glb` **before** skeleton / clip validation; `.glb` / `.gltf` stay local (no convert hop)
- [ ] After convert, library entry names use `{basename}.glb` so rename and zip export stay unchanged
- [ ] Convert / oversize / non-fbx failures are user-visible (same surfaces as a bad GLB: model `error`, clip failed entry)
- [ ] Convert API is a Vercel Node serverless function (`@astrojs/vercel`, not Edge); request body cap matches Vercel’s payload limit (typically 4.5MB)

## Out of scope for this delta

- Chunked / blob upload for FBX larger than Vercel’s function payload
- Silent retarget of Mixamo / other vendor bone names (US-6 still applies after convert)
- Material / texture editing, server accounts, collab
- US-8…US-10
