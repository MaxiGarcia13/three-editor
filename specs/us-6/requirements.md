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

## Follow-up acceptance

- [x] Retarget mapping UI opens in a modal (Settings aside stays available)
- [x] After switching the previewed model, clips that no longer match show Fix / Retarget for that character
- [x] **This model** apply: new ready clip for the current character; source clip kept
- [x] **All models** apply: one remapped library clip (source replaced) and every loaded model’s bones renamed to the mapping targets; fail clearly if a model cannot resolve the map
- [x] Apply UI offers an explicit This model / All models choice (no silent all-model normalize)

## Out of scope for this delta

- Full NLA / multi-clip blending (US-7)
- Morph editing, curve UI, undo stack
- Auto-selecting which clip variant to play per model when multiple clips exist (This model scope)
- Per-model bind remap without renaming bones (normalize-bones path chosen instead)
