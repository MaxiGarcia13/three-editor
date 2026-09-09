import { writeNodeKeyframe } from '@/modules/animation/services/keyframe-write';
import { resumeMixerBindings } from '@/modules/animation/services/mixer-session';
import { readClipTimelineTime } from '@/modules/animation/utils/to-timeline-time';
import { $activeModel } from '@/modules/viewport/stores/model-store';
import {
  $poseDirty,
  $poseEditKind,
  clearPoseDirty,
} from '@/modules/viewport/stores/pose-edit-store';
import { $selection } from '@/modules/viewport/stores/selection-store';
import { $clips } from '../store';
import { isReadyClip } from '../utils';

export function saveKeyframe(): void {
  if (!$poseDirty.get()) {
    return;
  }

  const kind = $poseEditKind.get();
  const object
    = kind === 'modelRoot'
      ? $activeModel.get()?.scene ?? null
      : $selection.get().object;
  if (!object) {
    return;
  }

  const state = $clips.get();
  const active = state.clips.find((entry) => entry.id === state.activeClipId);

  // Model-root commit and bind-pose commit (no clip): TRS already on the scene.
  if (kind === 'modelRoot' || !isReadyClip(active)) {
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
  resumeMixerBindings();
  clearPoseDirty();
}
