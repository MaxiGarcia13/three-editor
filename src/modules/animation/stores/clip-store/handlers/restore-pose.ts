import { restoreMixerPose } from '@/modules/animation/services/mixer-session';
import { $editTool } from '@/modules/viewport/stores/edit-tool-store';
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
  const { object: selected } = $selection.get();
  const isMove = $editTool.get() === 'move';

  if (isMove || !activeClipId) {
    if (selected) {
      restoreFromSnapshot(selected);
    }
    $poseDirty.set(false);
    return;
  }

  restoreMixerPose();
}
