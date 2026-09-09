import type { ClipLibraryState } from '@/modules/animation/types/clip';
import { $retargetClipId, closeRetarget } from '@/modules/animation/stores/retarget-ui-store';
import { $clips } from '../store';
import { isReadyClip } from '../utils';
import { selectClip } from './select-clip';

export function removeClip(id: string): void {
  const state = $clips.get();
  const clips = state.clips.filter((entry) => entry.id !== id);
  if (clips.length === state.clips.length) {
    return;
  }

  if ($retargetClipId.get() === id) {
    closeRetarget();
  }

  const wasActive = state.activeClipId === id;
  const wasBlend = state.blendClipId === id;

  if (!wasActive && !wasBlend) {
    $clips.setKey('clips', clips);
    return;
  }

  const base: ClipLibraryState = {
    ...state,
    clips,
    blendBaseClip: wasBlend ? null : state.blendBaseClip,
    blendClipId: wasBlend ? null : state.blendClipId,
    blendWeight: wasBlend ? 0 : state.blendWeight,
  };

  if (!wasActive) {
    $clips.set(base);
    return;
  }

  const nextReady = clips.find((entry) => isReadyClip(entry));
  $clips.set({
    ...base,
    activeClipId: null,
    playing: false,
    duration: 0,
  });

  if (nextReady) {
    selectClip(nextReady.id);
  }
}
