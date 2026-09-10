# US-18 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Spec

- [x] Requirements + design for hips-only positions + bind-frame rebase
- [ ] Fold into `specs/current/` and changelog row when shipped

## Implement

- [x] Capture `sourceBindFrames` (local position + parent world quat per bone) on clip load / `ClipEntry`
- [x] Resolve mapped hips pair at Apply; fail clearly if rebase inputs missing
- [x] Remap path: drop non-hips `.position`; delta-from-bind hips position (× US-17 ratio on Δ) + hips quaternion rebase
- [x] Keep US-17 ratio helper and non-hips quaternion / scale behavior unchanged

## Verify

- [x] `body-block` → `Y Bot`: upright, roughly human-sized, toes near Y = 0 (not floating)
- [ ] Same-hierarchy Mixamo→Mixamo: pose still plausible (rebase ≈ identity)
- [ ] All US-18 acceptance criteria in [`requirements.md`](./requirements.md) pass
