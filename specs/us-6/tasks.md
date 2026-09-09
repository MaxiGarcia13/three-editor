# US-6 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [x] Confirm US-2 mismatch error path exists
- [x] Collect sample source/target rigs and document registry entries

## Implement

- [x] Bone / track alias registry module
- [x] Retarget mapping UI (source → target)
- [x] Clip remap service → new working clip
- [x] Wire into library + mixer; errors on incomplete maps

## Verify

- [x] All US-6 acceptance criteria in [`requirements.md`](./requirements.md) pass
- [x] No silent retarget on plain import

## Follow-up

Do not start remaining items until explicitly kicked off. Tick only after acceptance.

- [x] Retarget UI opens in a modal (not the Settings aside); Cancel / overlay closes
- [ ] When the previewed model makes a clip mismatch, offer Fix / Retarget (library + after model switch)
- [ ] Apply adds a new ready clip for the current character; leave the source clip in the library (needed when the same clip still matches another model)
- [ ] Verify: Model A ready + Model B error → fix for B → both clips remain; A still plays on A
