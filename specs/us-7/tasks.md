# US-7 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [x] Confirm single-action mixer from US-2
- [x] Lock export contract: viewport blend; discrete clips on export; Bake commits

## Implement (playback — done)

- [x] Dual-action / cross-fade playback API in `animation` domain

## Implement (draft / New animation UX)

- [x] New animation creates an **editable** draft from scratch (not a clone)
- [x] Library list selection like models; no Active Clip dropdown
- [x] Clicking selected animation again unselects to T-pose
- [x] Draft Start/End, speed, play, and keyframes write only the draft
- [x] Reusable `Collapsible` for Settings Blend section
- [x] Blend form: partner select, weight, fade, Bake + Reset (viewport until Bake; Bake resets form)
- [ ] Document and test export interaction with US-5

## Verify

- [ ] All US-7 acceptance criteria in [`requirements.md`](./requirements.md) pass
