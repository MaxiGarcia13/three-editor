# US-4 design

## Scope

Selection + TransformControls + keyframe insert/update on the active clip.

## Interaction flow

1. User pauses or scrubs so the timeline playhead is the target timestamp
2. Raycast pick in the viewport → bone or mesh; attach TransformControls
3. User adjusts translate / rotate / scale as needed
4. “Hold Pose to End”:
   - Read selection **local** position, quaternion, scale
   - Resolve track name for that node (same naming convention as existing clip tracks)
   - Find or create `VectorKeyframeTrack` / `QuaternionKeyframeTrack` on the active working clip
   - Write a hold plateau from clip-local playhead `t` through `duration` (sample at `t` and at `duration`; drop keys strictly inside); do not extend clip duration. Scrub + edit + hold again later overwrites from the new playhead forward
5. “Restore Pose” (same dirty-only visibility): resume mixer bindings and `setTime` to the current playhead so the clip pose replaces the unsaved gizmo edit
6. After hold, refresh the mixer action at that same clip-local time so playback reflects the edit

## Viewport

- Raycasting against character hierarchy (bones may need helper visibility — prefer minimal SkeletonHelper only if selection needs it)
- TransformControls must not fight OrbitControls (disable orbit while dragging gizmo)
- Transform mode is translate / rotate / scale (toolbar + W / E / R); default translate; gizmo uses **local** space so bone rotates match saved local quaternions
- While dragging the gizmo, pause playback and suspend mixer bindings so clip tracks cannot overwrite the pose
- Clear selection when character is replaced

## Layering

- Pure “insert keyframe into track data” logic in `animation` services/utils at the boundary; Three track objects via adapters
- Hot-path selection / gizmo in `viewport`; TransformControls marks pose dirty on edit
- “Hold Pose to End” / “Restore Pose” live in the preview chrome overlay and appear only while pose is dirty; hold writes playhead→end; restore re-applies the clip at the playhead

## Non-goals

No full curve editor; no undo stack beyond whatever session clip references already exist.
