# US-18 — Retarget hips bind-frame (drop non-hips positions)

Delta so remapped Mixamo-style clips stay upright after US-17 unit scale. Parent contract: [`specs/current/requirements.md`](../current/requirements.md). Extends **US-6** / **US-17**.

**Depends on:** US-17 (rest-pose length-ratio position scale).

## Story

As an editor user, when I retarget a Mixamo (or similar) clip whose source GLB has an armature axis offset onto a Y-up character, the character stands roughly upright instead of lying in the floor after Apply.

## Acceptance

- [x] On **Apply Retarget**, remapped `.position` tracks are kept **only for the hips/root bone** (mapped pair whose source or target name is hips); other `.position` tracks are dropped so limbs use the target bind offsets
- [x] Hips `.position` keyframes are rebased from source parent bind orientation into target parent bind orientation, then multiplied by the US-17 length ratio (not scale alone)
- [x] Hips `.quaternion` keyframes are rebased the same way (source parent bind → target parent bind); other quaternion / scale tracks stay name-remapped only
- [x] Source bind frames (per-bone parent world quaternion at rest) are captured when the clip file is loaded and stored on the library entry; target frames come from the previewed scene at Apply
- [ ] Same-hierarchy source/target (matching parent bind orientations) remains effectively unchanged aside from US-17 scale and dropped non-hips positions
- [x] If hips cannot be resolved for rebase (no hips in mapping / missing bind frames) while position tracks exist, Apply fails clearly and does not write a clip or rename model bones
- [ ] Verify with `body-block` → `Y Bot`: after retarget + play, mesh is roughly human-sized **and** upright (not flat on the grid)

## Out of scope for this delta

- Full per-bone IK / `SkeletonUtils.retargetClip`
- Baking armature ±90° inside `fbx-to-glb`
- Changing US-17 median ratio math
- US-8…US-10
