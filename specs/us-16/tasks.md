# US-16 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [x] Add `@astrojs/vercel` and `fbx2gltf`; keep the editor page prerendered
- [x] Confirm Linux binary `includeFiles` / Darwin+Windows `excludeFiles` and Vite SSR external for `fbx2gltf`

## Implement

- [x] `POST /api/v1/fbx-to-glb` (`prerender = false`): multipart `file`, size/type checks, convert in `/tmp`, return GLB
- [x] Server-only convert module under `src/modules/import/` (never imported from React islands)
- [x] `ensureGltfFile` in model + clip loaders before `parseGltfFile`
- [x] File picker `accept` includes `.fbx`; entry names after convert use `{basename}.glb`

## Verify

- [ ] `astro dev`: Mixamo-style `.fbx` as **model** and as **clips** (import + replace); skinned mesh / clip library follow the GLB path
- [ ] `.glb` / `.gltf` import has no convert hop
- [ ] Bad / non-fbx / oversize POST returns a user-visible error
- [ ] All US-16 acceptance criteria in [`requirements.md`](./requirements.md) pass
