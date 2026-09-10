# US-17 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Spec

- [x] Requirements + design for rest-pose length-ratio position scale on retarget
- [ ] Fold into `specs/current/` and changelog row when shipped

## Implement

- [x] Capture `sourceBindLengths` from clip GLB scene in `loadClipsFromFile` / `ClipEntry`
- [x] Compute median rest-pose length ratio at Apply (mapped pairs, ε floor); clear error if empty
- [ ] Scale remapped `.position` values by that ratio inside remap / retarget apply path
- [ ] Keep quaternion / scale tracks and US-6 skip / scopes unchanged

## Verify

- [ ] `body-block` → `Y Bot`: Apply Retarget + play — mesh stays roughly human-sized (no teal shard)
- [ ] Same-unit Mixamo→Mixamo (ratio ≈ 1): pose still looks correct
- [ ] Clip import without usable source bones: Apply fails clearly, no corrupt library / scene
- [ ] All US-17 acceptance criteria in [`requirements.md`](./requirements.md) pass
