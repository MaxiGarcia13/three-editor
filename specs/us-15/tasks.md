# US-15 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [ ] Confirm sample model loads with no clips and that export packs scene-root / bone TRS as-authored
- [ ] Align Save / Restore UI with existing preview dirty chrome (US-4)

## Implement

- [x] `$editTool` store (`edit` | `move`) + Edit / Move toggle in `EditorPreview` (`CursorIcon` / `MoveIcon`)
- [x] Move mode: attach translate / world TransformControls to active model root; hide W / E / R; gate raycast
- [x] Pre-edit TRS snapshot on first dirty; Restore without mixer when no active clip or in Move mode
- [x] Save branches: bind-pose commit (no clip), Hold Pose to End (active clip + Edit), root translation commit (Move)
- [x] Auto-Restore on Edit ↔ Move switch while dirty
- [x] Show Save / Restore whenever dirty (both tools)
- [x] Settings General: live editable X / Y / Z for **model root**, independent of Edit / Move tool
- [x] `$poseEditKind` (`modelRoot` | `selection`) drives Save / Restore branching

## Verify

- [ ] All US-15 acceptance criteria in [`requirements.md`](./requirements.md) pass
- [ ] Edit without clip → Save → download `{model}.glb` reflects bind pose
- [ ] Move → Save → download `{model}.glb` reflects root translation on X / Y / Z
- [ ] Dragging the Move gizmo updates the Settings X / Y / Z readout
- [ ] Typing X / Y / Z in Settings moves the model root while Edit tool is active and enables Save / Restore
