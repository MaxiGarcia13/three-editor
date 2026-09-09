import { setMixerTime } from '@/modules/animation/services/mixer-session';
import { $clips } from '../store';
import { isReadyClip } from '../utils';
import { clearActiveClip } from './clear-active-clip';

/** Library list selection (same pattern as models). */
export function selectClip(id: string): void {
  if (!id) {
    clearActiveClip();
    return;
  }

  const target = $clips.get().clips.find((entry) => entry.id === id);
  if (!isReadyClip(target)) {
    return;
  }

  if ($clips.get().activeClipId === id) {
    clearActiveClip();
    return;
  }

  setMixerTime(0);
  $clips.set({
    ...$clips.get(),
    activeClipId: id,
    blendBaseClip: null,
    blendClipId: null,
    blendWeight: 0,
    duration: target.clip.duration,
    playing: false,
    trimStart: 0,
    trimEnd: target.clip.duration,
  });
}
