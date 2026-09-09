# US-15 — Edit / Move tools + bind-pose save

Delta for preview tool modes (bone/mesh edit vs whole-model move), editing without an active clip, and Save / Restore confirmation. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-1 (model in viewport), US-4 (TransformControls + keyframe hold when a clip is active).

## Story

As an editor user, I can choose Edit or Move in the preview, pose bones/meshes or place the whole model on world X/Y/Z with or without an animation, and Save or Restore to confirm or discard.

## Acceptance

- [ ] When a model is loaded, preview chrome shows mutually exclusive **Edit** (`CursorIcon`) and **Move** (`MoveIcon`) tool toggles
- [ ] **Edit:** raycast selects a bone or mesh; TransformControls support translate / rotate / scale (existing W / E / R toolbar when selected); works with **no** imported / active clip
- [ ] **Move:** TransformControls translate the active model root on **world X / Y / Z** only; W / E / R toolbar is hidden; raycast does not switch selection away from the root
- [ ] After a gizmo edit (either tool), **Save** and **Restore** appear in the preview until the user confirms or discards
- [ ] **Edit + no active clip — Save:** commits the selection’s local TRS as the model bind pose (persists on the scene graph and in exported `{model}.glb`)
- [ ] **Edit + active ready clip — Save:** keeps US-4 Hold Pose to End (plateau on the working clip from playhead to clip end)
- [ ] **Move — Save:** commits the model root translation (persists on the scene graph and in exported `{model}.glb`); never writes animation keyframes
- [ ] **Restore:** discards the unsaved gizmo edit (with an active clip in Edit mode, re-applies the clip at the playhead; otherwise restores the pre-edit TRS snapshot)
- [ ] Switching Edit ↔ Move while dirty auto-Restores, then switches tools
- [ ] Settings sidebar (`EditorSettingsSidebar` General) shows live **X / Y / Z** position values for the active target: model root in **Move**; selected bone/mesh local position in **Edit** when something is selected (hidden or empty when nothing applies)

## Out of scope for this delta

- Rotate / scale of the whole model in Move mode
- Multi-model simultaneous transform
- Full undo / redo stack (US-10)
- Morphs, blending, curve UI
