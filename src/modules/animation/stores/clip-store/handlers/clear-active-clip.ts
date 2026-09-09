import { $poseDirty } from '@/modules/viewport/stores/pose-edit-store';
import { $clips } from '../store';
import { restorePose } from './restore-pose';

/** Clear the active clip (T-pose / bind pose). Mixer effect restores rest TRS. */
export function clearActiveClip(): void {
  const state = $clips.get();
  if (state.activeClipId === null && !state.playing) {
    return;
  }

  if ($poseDirty.get()) {
    restorePose();
  }

  $clips.set({
    ...$clips.get(),
    activeClipId: null,
    playing: false,
    duration: 0,
    trimStart: 0,
    trimEnd: 0,
  });
}
