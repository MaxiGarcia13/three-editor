import { restoreMixerPose } from '@/modules/animation/services/mixer-session';
import { $editTool } from '@/modules/viewport/stores/edit-tool-store';
import { $activeModel } from '@/modules/viewport/stores/model-store';
import {
  $poseDirty,
  restoreFromSnapshot,
} from '@/modules/viewport/stores/pose-edit-store';
import { $selection } from '@/modules/viewport/stores/selection-store';
import { $clips } from '../store';

/** Discard unsaved gizmo edits and re-apply the active clip at the playhead. */
export function restorePose(): void {
  if (!$poseDirty.get()) {
    return;
  }

  const { activeClipId } = $clips.get();
  const isMove = $editTool.get() === 'move';
  const object = isMove ? $activeModel.get()?.scene ?? null : $selection.get().object;

  if (isMove || !activeClipId) {
    if (object) {
      restoreFromSnapshot(object);
    }
    $poseDirty.set(false);
    return;
  }

  restoreMixerPose();
}
