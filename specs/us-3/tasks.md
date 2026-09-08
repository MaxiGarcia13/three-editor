# US-3 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [ ] Confirm US-2 playback works on a real clip
- [ ] Confirm trim clone-then-replace contract with current design

## Implement

- [x] Start / End Time inputs for active clip
- [x] Clone → working window trim → replace working library entry
- [x] Session recoverability of pre-trim clip
- [x] Rebind mixer action after trim; update scrubber duration
- [x] Speed multiplier slider → `mixer.timeScale`

## Verify

- [ ] All US-3 acceptance criteria in [`requirements.md`](./requirements.md) pass
- [ ] No export bake or keyframe write left half-wired in this delta
