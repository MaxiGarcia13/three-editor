import { setMixerTime } from '@/modules/animation/services/mixer-session';
import { readClipTimelineTime } from '@/modules/animation/utils/to-timeline-time';
import { $poseDirty } from '@/modules/viewport/stores/pose-edit-store';

/** Discard unsaved gizmo edits and re-apply the active clip at the playhead. */
export function restorePose(): void {
  if (!$poseDirty.get()) {
    return;
  }
  setMixerTime(readClipTimelineTime());
}
