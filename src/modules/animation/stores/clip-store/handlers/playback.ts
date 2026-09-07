import { getMixerTime, setMixerTime } from '@/modules/animation/services/mixer-session';
import { $clips } from '../store';
import { isReadyClip } from '../utils';

export function play(): void {
  const state = $clips.get();
  const active = state.clips.find((entry) => entry.id === state.activeClipId);
  if (!isReadyClip(active)) {
    return;
  }
  if (!state.loop && state.duration > 0 && getMixerTime() >= state.duration) {
    setMixerTime(0);
  }
  $clips.setKey('playing', true);
}

export function pause(): void {
  $clips.setKey('playing', false);
}

export function stop(): void {
  setMixerTime(0);
  $clips.setKey('playing', false);
}

export function toggleLoop(): void {
  $clips.setKey('loop', !$clips.get().loop);
}
