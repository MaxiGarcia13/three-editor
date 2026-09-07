# US-4 design

## Scope

Selection + TransformControls + keyframe insert/update on the active clip.

## Interaction flow

1. User pauses or scrubs so `mixer.time` is the target timestamp
2. Raycast pick in the viewport → bone or mesh; attach TransformControls
3. User adjusts translate / rotate / scale as needed
4. “Save Keyframe at Current Time”:
   - Read selection **local** position, quaternion, scale
   - Resolve track name for that node (same naming convention as existing clip tracks)
   - Find or create `VectorKeyframeTrack` / `QuaternionKeyframeTrack` on the active working clip
   - Insert or update values at `mixer.time`; keep times sorted
5. Refresh the mixer action so playback reflects the edit

## Viewport

- Raycasting against character hierarchy (bones may need helper visibility — prefer minimal SkeletonHelper only if selection needs it)
- TransformControls must not fight OrbitControls (disable orbit while dragging gizmo)
- Clear selection when character is replaced

## Layering

- Pure “insert keyframe into track data” logic in `animation` services/utils at the boundary; Three track objects via adapters
- Hot-path selection / gizmo in `viewport`; save button in sidebar triggers animation domain write

## Non-goals

No full curve editor; no undo stack beyond whatever session clip references already exist.
