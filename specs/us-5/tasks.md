# US-5 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [ ] Confirm character + at least one working clip available
- [ ] Confirm bake-on-export contract in current design

## Implement

- [ ] Bake helper for `timeScale !== 1` (clone clips; scale times / duration)
- [ ] `GLTFExporter` adapter packing character + all working clips
- [ ] “Download Edited GLB” sidebar control + blob download
- [ ] Disable / error when no character (and handle exporter failures)

## Verify

- [ ] All US-5 acceptance criteria in [`requirements.md`](./requirements.md) pass
- [ ] Downloaded GLB opens in an external viewer with expected clips and baked speed
