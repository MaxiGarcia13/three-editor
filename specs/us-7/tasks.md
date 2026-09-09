# US-7 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [x] Confirm single-action mixer from US-2
- [x] Lock export contract: bake blend to one clip on demand

## Implement (playback — done)

- [x] Dual-action / cross-fade playback API in `animation` domain
- [x] Sidebar blend / fade controls (Settings `BlendControls` — superseded by draft UX below)
- [x] Optional “Bake blend” → new library clip (superseded by save-draft below)

## Implement (draft / New animation UX)

- [ ] Lock authorship: blank draft is sole write target; source clips stay read-only
- [ ] Library Animations: **New animation** button using `PlusIcon` next to import (`EditorLibrarySidebar` / section header action)
- [ ] New animation appends a blank draft library entry and selects it for authoring
- [ ] Rewire blend + fade + draft timing controls onto the active draft (not overlay bake on an arbitrary active clip)
- [ ] Save/bake writes one result into that draft; remove Settings **Bake blend** button
- [ ] Document and test export interaction with US-5

## Verify

- [ ] All US-7 acceptance criteria in [`requirements.md`](./requirements.md) pass
