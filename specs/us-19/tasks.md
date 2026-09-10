# US-19 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [ ] Spec delta reviewed against mockup (Models → model + Shared Animations; icon map)
- [ ] Confirm export pack rules with US-5 zip behavior

## Implement — ownership

- [x] Add `ownerModelId: string | null` to `ClipEntry`
- [x] Wire import / create / draft under Shared vs under a model
- [x] Clone handler for **Add animation** (selector + Apply → owned clone)
- [x] On model remove, delete owned clips
- [x] Update sync / validation for owned vs shared context
- [x] Export: owned + validating shared; skip conflicted shared

## Implement — retarget

- [x] **This model:** new owned remapped clip; keep shared original
- [x] **All models:** partial success — normalize compatible models; conflict remains for incompatible

## Implement — UI

- [x] Extend `Collapsible` with `leading` + `actions`
- [x] Iconize `AssetEntry` actions; leading icon slot for clips (`AnimationIcon`)
- [x] Rebuild `editor-library-sidebar`: Models > model collapsibles + Shared Animations
- [x] Model header: `ModelIcon` + Retarget / Animation / Edit / Replace / Remove icons
- [x] Shared header: `AnimationIcon` + Upload / New
- [x] Clip rows: `AnimationIcon` + Remove (+ Retarget when conflict)
- [x] Add-animation modal (Create new | Import | Add existing) from model-header Animation action
- [x] Model upload / replace: embedded clips owned by that model
- [x] Model-header Retarget → `RetargetModal` for selected / first conflicted clip

## Verify

- [ ] All US-19 acceptance criteria in [`requirements.md`](./requirements.md) pass
