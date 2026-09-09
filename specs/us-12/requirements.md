# US-12 — Rename library entries

Delta for editing display names of models and animation clips in the sidebar libraries. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-2 (clip library), US-11 (model library). Do not start until explicitly kicked off.

## Story

As an editor user, I can rename a model or animation in the library so labels and exported filenames match what I intend.

## Acceptance

- [ ] User can rename any model library entry; the new name appears in the sidebar and as the previewed-row label
- [ ] User can rename any clip library entry (ready or errored); the new name appears in the sidebar, the active-clip selector, and related chrome that shows `ClipEntry.name`
- [ ] Entry `id` stays stable across rename (selection, replace, retarget, and mixer bindings must not break)
- [ ] Clip rename updates `ClipEntry.name` and, when present, `AnimationClip.name` on both the working `clip` and `sourceClip` so exported GLB animation metadata matches the library label
- [ ] Model rename updates `ModelEntry.fileName` (the field used for display and zip naming)
- [ ] Clip `sourceFile` stays the original import file name (provenance); rename does not rewrite it
- [ ] Empty or whitespace-only names are rejected; the previous name is kept
- [ ] Zip export (US-5) uses the renamed values for `{model}.glb` / `{clip}.glb` basenames (existing extension strip + collision suffix still apply)
- [ ] Rename is keyboard-operable and labelled (NFR-4)

## Out of scope for this delta

- Renaming bones / scene nodes inside the model graph
- Persisting names across reloads
- Undo / redo of rename (US-10)
- Bulk rename or unique-name enforcement beyond export collision suffixes
