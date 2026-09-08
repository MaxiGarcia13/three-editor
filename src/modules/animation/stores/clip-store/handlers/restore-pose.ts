import { restoreMixerPose } from '@/modules/animation/services/mixer-session';
import { $poseDirty } from '@/modules/viewport/stores/pose-edit-store';

/** Discard unsaved gizmo edits and re-apply the active clip at the playhead. */
export function restorePose(): void {
  if (!$poseDirty.get()) {
    return;
  }
  restoreMixerPose();
}
