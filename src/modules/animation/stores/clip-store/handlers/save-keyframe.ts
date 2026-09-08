import { writeNodeKeyframe } from '@/modules/animation/services/keyframe-write';
import { readClipTimelineTime } from '@/modules/animation/utils/to-timeline-time';
import { clearPoseDirty } from '@/modules/viewport/stores/pose-edit-store';
import { $selection } from '@/modules/viewport/stores/selection-store';
import { $clips } from '../store';
import { isReadyClip } from '../utils';

export function saveKeyframe(): void {
  const state = $clips.get();
  const active = state.clips.find((entry) => entry.id === state.activeClipId);
  const object = $selection.get().object;
  if (!isReadyClip(active) || !object) {
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
  clearPoseDirty();
}
