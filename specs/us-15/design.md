# US-15 design

## Scope

Preview tool modes for bone/mesh editing vs whole-model placement, bind-pose persistence when no clip is active, and shared Save / Restore confirmation.

## Approach

1. **`$editTool` store** under `viewport/stores` — `'edit' | 'move'`, default `'edit'`. Toggle in `EditorPreview` with `CursorIcon` / `MoveIcon` when a model is loaded.
2. **Edit mode** — existing raycast selection + `TransformControls` in local space; W / E / R mode toolbar when something is selected (US-4).
3. **Move mode** — select / attach to active `ModelEntry.scene`; `TransformControls` with `mode="translate"` and `space="world"`; hide transform-mode toolbar; disable or ignore raycast picks so the user stays on the root.
4. **Dirty + snapshot** — on first gizmo / Settings change, mark `$poseDirty`, set `$poseEditKind` (`modelRoot` | `selection`), and snapshot the edited object’s pre-edit local TRS so Restore works without a mixer action.
5. **Save branching** (by `$poseEditKind`, not active tool)
   - `selection` + active ready clip → existing `saveKeyframe` / Hold Pose to End
   - `selection` + no ready clip → keep Object3D TRS on the scene; compute TRS **delta** from pre-edit snapshot → current; rebase that node’s `.position` / `.quaternion` / `.scale` tracks in every library `clip` **and** `sourceClip`; accumulate the delta per active `modelId` + node name so import / replace apply the same rebase; clear dirty + snapshot
   - `modelRoot` → keep `scene` translation, clear dirty + snapshot; no keyframe write / no clip rebase
6. **Restore branching**
   - `selection` + active clip → existing `restoreMixerPose`
   - `modelRoot`, or `selection` + no clip → write snapshot TRS back onto the object, clear dirty
7. **Tool switch while dirty** — auto-Restore, then set `$editTool` (no stranded half-edit). Settings root edits while a `selection` edit is dirty also auto-Restore first (and the reverse when the gizmo starts a different kind).
8. **Selection change while dirty** — `selectObject` / `clearSelection` call `restorePose()` **before** updating `$selection` (so snapshot still targets the edited object). Same-object re-pick is a no-op (keeps dirty + Save / Restore). Empty pick or a different bone/mesh discards the pending edit in the preview.

## UI

- Tool toggle: always visible in preview when a model is loaded (near existing overlay chrome)
- Transform mode toolbar: Edit + selection only
- Save / Restore: visible only while dirty (extend or replace `SaveKeyframeButton` labels as needed; Hold Pose copy remains correct when an active clip drives Edit save)
- **Position fields** in `EditorSettingsSidebar` General (alongside world-axes controls): live editable X / Y / Z for the **active model root** (`scene.position`), independent of `$editTool`. Writing a finite number applies that axis, captures a `modelRoot` pre-edit snapshot (auto-Restoring a pending `selection` edit first if needed), suspends mixer bindings, and marks dirty. Save / Restore branch on `$poseEditKind`, not the active tool. Live readout updates from the viewport driver while not focused.
- **Active Clip** dropdown: first option is **T-pose** (`activeClipId: null`) whenever a model is loaded. Selecting it discards a pending dirty edit if needed, clears the active clip, and applies the captured rest / bind pose (snapshot at mixer mount; refreshed on bind-pose or model-root Save). Do not auto-select a ready clip on skeleton sync when the user is already on T-pose.

## Non-goals

Whole-model rotate/scale; undo stack; changing US-5 pack paths beyond relying on mutated `model.scene` TRS.

## Bind-pose clip rebase

- Deltas are per `modelId` + node name; cleared when that model is removed or replaced
- Position: `p' = p + Δp`; quaternion: `q' = Δq * q`; scale: `s' = s * Δs` (component-wise)
- Import / Replace clone then apply the active model’s accumulated deltas before the entry enters the library
- **Retarget (US-6):** after tracks are remapped to the character’s bone names, apply the same active-model bind deltas (mismatched imports cannot rebase earlier — track names do not match yet)
- Does not change US-4 Hold Pose to End when a ready clip is active
