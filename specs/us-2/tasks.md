# US-2 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [ ] Confirm US-1 character load + viewport shipped or available on the branch
- [ ] Inspect sample animation GLBs (clip names, track targets) before wiring the mixer

## Implement

- [ ] Animation file upload → extract clips into library
- [ ] Clip selector (dropdown or list)
- [ ] `AnimationMixer` + active `AnimationAction` lifecycle on character root
- [ ] Play / Pause / Stop / loop
- [ ] Timeline scrubber bound to mixer time
- [ ] Skeleton / track mismatch → user-visible error (no retarget)

## Verify

- [ ] All US-2 acceptance criteria in [`requirements.md`](./requirements.md) pass
- [ ] No trim / keyframe / export UI left half-wired in this delta
