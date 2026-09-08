# US-4 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [ ] Confirm pause / scrub from US-2 works
- [ ] Inspect character bone names vs clip track names on sample assets

## Implement

- [x] Raycast selection of bone / mesh in viewport
- [x] TransformControls attach + orbit conflict handling
- [x] “Hold Pose to End” + “Restore Pose” in preview (visible only when pose is dirty)
- [x] Capture local TRS; find/create Vector / Quaternion tracks on active clip
- [x] Hold plateau from playhead through clip end; rebind action without extending duration
- [x] Restore discards unsaved pose and re-applies clip at playhead

## Verify

- [ ] All US-4 acceptance criteria in [`requirements.md`](./requirements.md) pass
- [ ] No export path left half-wired in this delta
