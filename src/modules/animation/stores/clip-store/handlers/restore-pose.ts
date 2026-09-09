import { restoreMixerPose } from '@/modules/animation/services/mixer-session';
import { $activeModel } from '@/modules/viewport/stores/model-store';
import {
  $poseDirty,
  $poseEditKind,
  clearPoseDirty,
  restoreFromSnapshot,
} from '@/modules/viewport/stores/pose-edit-store';
import { $selection } from '@/modules/viewport/stores/selection-store';
import { $clips } from '../store';

/** Discard unsaved gizmo / Settings edits. */
export function restorePose(): void {
  if (!$poseDirty.get()) {
    return;
  }

  const kind = $poseEditKind.get();
  const { activeClipId } = $clips.get();
  const object
    = kind === 'modelRoot'
      ? $activeModel.get()?.scene ?? null
      : $selection.get().object;

  if (kind === 'modelRoot' || !activeClipId) {
    if (object) {
      restoreFromSnapshot(object);
    }
    clearPoseDirty();
    return;
  }

  restoreMixerPose();
}
