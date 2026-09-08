# US-4 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [ ] Confirm pause / scrub from US-2 works
- [ ] Inspect character bone names vs clip track names on sample assets

## Implement

- [x] Raycast selection of bone / mesh in viewport
- [x] TransformControls attach + orbit conflict handling
- [x] “Save Keyframe at Current Time” control in preview (visible only when pose is dirty)
- [x] Capture local TRS; find/create Vector / Quaternion tracks on active clip
- [x] Insert/update at clip-local time (timeline playhead); rebind action without extending duration

## Verify

- [ ] All US-4 acceptance criteria in [`requirements.md`](./requirements.md) pass
- [ ] No export path left half-wired in this delta
