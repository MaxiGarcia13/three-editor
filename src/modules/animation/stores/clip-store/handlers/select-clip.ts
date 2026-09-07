import { setMixerTime } from '@/modules/animation/services/mixer-session';
import { $clips } from '../store';
import { isReadyClip } from '../utils';

export function selectClip(id: string): void {
  const target = $clips.get().clips.find((entry) => entry.id === id);
  if (!isReadyClip(target)) {
    return;
  }
  setMixerTime(0);
  $clips.set({
    ...$clips.get(),
    activeClipId: id,
    duration: target.clip.duration,
    playing: false,
  });
}
