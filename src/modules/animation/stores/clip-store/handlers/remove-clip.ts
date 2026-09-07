import { $clips } from '../store';
import { isReadyClip } from '../utils';
import { selectClip } from './select-clip';

export function removeClip(id: string): void {
  const state = $clips.get();
  const clips = state.clips.filter((entry) => entry.id !== id);
  if (clips.length === state.clips.length) {
    return;
  }

  const wasActive = state.activeClipId === id;
  if (!wasActive) {
    $clips.setKey('clips', clips);
    return;
  }

  const nextReady = clips.find((entry) => isReadyClip(entry));
  $clips.set({
    ...state,
    clips,
    activeClipId: null,
    playing: false,
    duration: 0,
  });

  if (nextReady) {
    selectClip(nextReady.id);
  }
}
