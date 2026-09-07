# US-6 — Cross-rig retargeting

Delta for mapping animation clips from a foreign skeleton onto the loaded character. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-2 (clip library + mixer). Post-MVP — do not start until MVP US-1…US-5 ship (unless explicitly prioritized).

## Story

As an editor user, I can apply an animation authored for a different rig to my loaded character via an explicit retarget mapping.

## Acceptance

- [ ] User can open a retarget flow when imported clip tracks do not match the character skeleton
- [ ] Mapping is explicit (auto-suggest allowed; silent remap without confirmation is forbidden)
- [ ] Vendor bone prefixes (e.g. Mixamo) are handled only via a documented registry / mapping table — no hardcoded one-off string hacks in playback code
- [ ] Successfully retargeted clips become playable working clips in the library
- [ ] Failed or incomplete mappings leave a clear error and do not corrupt the character pose

## Out of scope for this delta

- Full NLA / multi-clip blending (US-7)
- Morph editing, curve UI, undo stack
