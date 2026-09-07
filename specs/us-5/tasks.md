# US-5 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [ ] Confirm US-11 model library (multiple models, one previewed) is available
- [ ] Confirm bake-on-export contract in current design
- [ ] Confirm per-model skeleton validation can run without changing the previewed UI status

## Implement

- [ ] Bake helper for `timeScale !== 1` (clone clips; scale times / duration)
- [ ] `GLTFExporter` adapter: model scene + matching working clips → `.glb`
- [ ] `GLTFExporter` adapter: animation-only (empty/minimal scene + one working clip) → `.glb`
- [ ] Zip helper; numeric suffix on filename collisions
- [ ] “Download” sidebar control + blob download of the zip
- [ ] Disable / error when nothing to pack; no partial zip on exporter failure

## Verify

- [ ] All US-5 acceptance criteria in [`requirements.md`](./requirements.md) pass
- [ ] Zip opens with one GLB per model (clips only where the skeleton matches) and one animation-only GLB per working clip
- [ ] Downloaded model GLBs open in an external viewer with expected mesh, matching clips, and baked speed
