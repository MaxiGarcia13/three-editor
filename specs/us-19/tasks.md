# US-19 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [ ] Spec delta reviewed against mockup (Models → model + Shared Animations; icon map)
- [ ] Confirm export pack rules with US-5 zip behavior

## Implement — ownership

- [x] Add `ownerModelId: string | null` to `ClipEntry`
- [ ] Wire import / create / draft under Shared vs under a model
- [ ] Clone handler for **Add animation** (selector + Apply → owned clone)
- [ ] On model remove, delete owned clips
- [ ] Update sync / validation for owned vs shared context
- [ ] Export: owned + validating shared; skip conflicted shared

## Implement — retarget

- [ ] **This model:** new owned remapped clip; keep shared original
- [ ] **All models:** partial success — normalize compatible models; conflict remains for incompatible

## Implement — UI

- [ ] Extend `Collapsible` with `leading` + `actions`
- [ ] Iconize `AssetEntry` actions; leading icon slot for clips (`AnimationIcon`)
- [ ] Rebuild `editor-library-sidebar`: Models > model collapsibles + Shared Animations
- [ ] Model header: `ModelIcon` + Retarget / Edit / Replace / Remove icons
- [ ] Shared header: `AnimationIcon` + Upload / New
- [ ] Clip rows: `AnimationIcon` + Remove (+ Retarget when conflict)
- [ ] Add-animation form under each model
- [ ] Model-header Retarget → `RetargetModal` for selected / first conflicted clip

## Verify

- [ ] All US-19 acceptance criteria in [`requirements.md`](./requirements.md) pass
