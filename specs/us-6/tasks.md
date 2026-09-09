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

- [x] Retarget UI opens in a modal (not the Settings aside); Cancel / overlay closes
- [x] When the previewed model makes a clip mismatch, offer Fix / Retarget (library + after model switch)
- [x] **This model** apply: new ready clip; leave the source clip in the library
- [x] Apply UI: explicit scope — This model | All models
- [x] **All models** apply: replace source with remapped clip; normalize bone names on every loaded model to mapping targets (vendor suggest to resolve); error if any model cannot resolve the full map
- [ ] Verify: This model keeps source; All models → one clip plays on every loaded character after normalize
