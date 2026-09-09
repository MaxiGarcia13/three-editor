import {
  computeBindPoseDelta,
  rebaseClipNode,
} from '@/modules/animation/services/bind-pose-rebase';
import { writeNodeKeyframe } from '@/modules/animation/services/keyframe-write';
import { resumeMixerBindings } from '@/modules/animation/services/mixer-session';
import {
  accumulateBindPoseDelta,
} from '@/modules/animation/stores/bind-pose-store';
import { readClipTimelineTime } from '@/modules/animation/utils/to-timeline-time';
import { $activeModel } from '@/modules/viewport/stores/model-store';
import {
  $poseDirty,
  $poseEditKind,
  $preEditTransform,
  clearPoseDirty,
} from '@/modules/viewport/stores/pose-edit-store';
import { $selection } from '@/modules/viewport/stores/selection-store';
import { $clips } from '../store';
import { isReadyClip } from '../utils';

function commitBindPoseToClips(nodeName: string): void {
  const snapshot = $preEditTransform.get();
  const object = $selection.get().object;
  const model = $activeModel.get();
  if (!snapshot || !object || !model) {
    return;
  }

  const delta = computeBindPoseDelta(snapshot, object);
  accumulateBindPoseDelta(model.id, nodeName, delta);

  const state = $clips.get();
  const clips = state.clips.map((entry) => {
    if (!entry.clip) {
      return entry;
    }
    const clip = entry.clip.clone();
    rebaseClipNode(clip, nodeName, delta);
    const sourceClip
      = entry.sourceClip && entry.sourceClip !== entry.clip
        ? rebaseClipNode(entry.sourceClip.clone(), nodeName, delta)
        : clip;
    return { ...entry, clip, sourceClip };
  });

  $clips.set({ ...state, clips });
}

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

  // Model-root commit: TRS already on the scene.
  if (kind === 'modelRoot') {
    resumeMixerBindings();
    clearPoseDirty();
    return;
  }

  // Bind-pose commit (no ready clip): scene TRS + rebase all library clips.
  if (!isReadyClip(active)) {
    const nodeName = object.name || object.uuid;
    commitBindPoseToClips(nodeName);
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
