import {
  getMixerTime,
  resumeMixerBindings,
  setMixerTime,
  setMixerTimeScale,
} from '@/modules/animation/services/mixer-session';
import { clearPoseDirty } from '@/modules/viewport/stores/pose-edit-store';
import { $clips } from '../store';
import { isReadyClip } from '../utils';

export const MIN_TIME_SCALE = 0.1;
export const MAX_TIME_SCALE = 3;

export function setTimeScale(scale: number): void {
  const clamped = Math.min(Math.max(scale, MIN_TIME_SCALE), MAX_TIME_SCALE);
  setMixerTimeScale(clamped);
  $clips.setKey('timeScale', clamped);
}

export function play(): void {
  const state = $clips.get();
  const active = state.clips.find((entry) => entry.id === state.activeClipId);
  if (!isReadyClip(active)) {
    return;
  }
  if (!state.loop && state.duration > 0 && getMixerTime() >= state.duration) {
    setMixerTime(0);
  }
  resumeMixerBindings();
  clearPoseDirty();
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
