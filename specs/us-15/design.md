# US-15 design

## Scope

Preview tool modes for bone/mesh editing vs whole-model placement, bind-pose persistence when no clip is active, and shared Save / Restore confirmation.

## Approach

1. **`$editTool` store** under `viewport/stores` — `'edit' | 'move'`, default `'edit'`. Toggle in `EditorPreview` with `CursorIcon` / `MoveIcon` when a model is loaded.
2. **Edit mode** — existing raycast selection + `TransformControls` in local space; W / E / R mode toolbar when something is selected (US-4).
3. **Move mode** — select / attach to active `ModelEntry.scene`; `TransformControls` with `mode="translate"` and `space="world"`; hide transform-mode toolbar; disable or ignore raycast picks so the user stays on the root.
4. **Dirty + snapshot** — on first gizmo change, mark `$poseDirty` and snapshot the edited object’s pre-edit local position / quaternion / scale so Restore works without a mixer action.
5. **Save branching**
   - Edit + active ready clip → existing `saveKeyframe` / Hold Pose to End
   - Edit + no clip → keep Object3D TRS on the scene (already applied by the gizmo), clear dirty + snapshot; export already packs `model.scene`
   - Move → keep `scene` translation, clear dirty + snapshot; no keyframe write
6. **Restore branching**
   - Edit + active clip → existing `restoreMixerPose`
   - Edit + no clip, or Move → write snapshot TRS back onto the object, clear dirty
7. **Tool switch while dirty** — auto-Restore, then set `$editTool` (no stranded half-edit).

## UI

- Tool toggle: always visible in preview when a model is loaded (near existing overlay chrome)
- Transform mode toolbar: Edit + selection only
- Save / Restore: visible only while dirty (extend or replace `SaveKeyframeButton` labels as needed; Hold Pose copy remains correct when an active clip drives Edit save)

## Non-goals

Whole-model rotate/scale; undo stack; changing US-5 pack paths beyond relying on mutated `model.scene` TRS.
