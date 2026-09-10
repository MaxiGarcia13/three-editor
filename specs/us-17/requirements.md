# US-17 — Retarget position scale (rest-pose length ratio)

Delta for scaling remapped `.position` tracks by the source→target rest-pose length ratio so unit mismatches (e.g. Mixamo cm vs metre characters) do not explode the mesh. Parent contract: [`specs/current/requirements.md`](../current/requirements.md). Extends **US-6**.

**Depends on:** US-6 (explicit retarget map + remap).

## Story

As an editor user, when I retarget a clip onto a character whose skeleton uses different units or overall size, the remapped animation keeps plausible limb lengths instead of collapsing or exploding the mesh.

## Acceptance

- [ ] On **Apply Retarget**, remapped `.position` track values are multiplied by a single **rest-pose length ratio** derived from mapped source→target bone pairs
- [ ] Ratio is `median(‖target bind local position‖ / ‖source bind local position‖)` over mapped pairs where both lengths exceed a small epsilon; quaternions and scales are unchanged
- [ ] Source bind lengths are captured when the clip file is loaded (from that GLB’s skeleton) and stored on the library entry; target bind lengths come from the previewed character scene at Apply
- [ ] If the ratio cannot be computed (no usable pairs), Apply fails with a clear error and does not write a clip or rename model bones
- [ ] Unmapped / skipped bones (US-6) stay dropped; name remap and This model / All models scopes are unchanged
- [ ] Verify with Mixamo-style cm clip (e.g. `body-block`) on metre Mixamo character (e.g. `Y Bot`): after retarget + play, the skinned mesh stays roughly character-sized (no shard / explode)

## Out of scope for this delta

- Rotation-only retarget (drop non-root position tracks) — alternate approach, not this US
- Per-bone IK / full humanoid retargeter / root-motion baking
- Silent retarget on import (US-6 still requires Apply)
- US-8…US-10, US-16
