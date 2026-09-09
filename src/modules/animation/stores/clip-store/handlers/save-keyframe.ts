import { writeNodeKeyframe } from '@/modules/animation/services/keyframe-write';
import { resumeMixerBindings } from '@/modules/animation/services/mixer-session';
import { readClipTimelineTime } from '@/modules/animation/utils/to-timeline-time';
import { $editTool } from '@/modules/viewport/stores/edit-tool-store';
import { $activeModel } from '@/modules/viewport/stores/model-store';
import { $poseDirty, clearPoseDirty } from '@/modules/viewport/stores/pose-edit-store';
import { $selection } from '@/modules/viewport/stores/selection-store';
import { $clips } from '../store';
import { isReadyClip } from '../utils';

export function saveKeyframe(): void {
  if (!$poseDirty.get()) {
    return;
  }

  const isMove = $editTool.get() === 'move';
  const object = isMove ? $activeModel.get()?.scene ?? null : $selection.get().object;
  if (!object) {
    return;
  }

  const state = $clips.get();
  const active = state.clips.find((entry) => entry.id === state.activeClipId);

  // Bind-pose commit (no clip) and root translation commit (Move): the gizmo
  // already wrote the local / world TRS onto the live scene graph, so the
  // model export picks it up as-authored. Confirming here is enough.
  if (isMove || !isReadyClip(active)) {
    resumeMixerBindings();
    clearPoseDirty();
    return;
  }

  const nodeName = object.name || object.uuid;
  const working = writeNodeKeyframe(active.clip, nodeName, readClipTimelineTime(), {
    position: [object.position.x, object.position.y, object.position.z],
    quaternion: [
      object.quaternion.x,
      object.quaternion.y,
      object.quaternion.z,
      object.quaternion.w,
    ],
    scale: [object.scale.x, object.scale.y, object.scale.z],
  });

  $clips.set({
    ...state,
    clips: state.clips.map((entry) =>
      entry.id === active.id ? { ...entry, clip: working } : entry,
    ),
    duration: working.duration,
  });
  // Clip identity change rebinds a fresh enabled action; resume is belt-and-suspenders.
  resumeMixerBindings();
  clearPoseDirty();
}
