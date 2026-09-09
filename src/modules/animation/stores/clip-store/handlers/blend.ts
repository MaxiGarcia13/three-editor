import {
  cancelBlendFade,
  fadeBlendWeightTo,
} from '@/modules/animation/services/mixer-session';
import { $clips } from '../store';
import { isReadyClip } from '../utils';

export const MIN_BLEND_WEIGHT = 0;
export const MAX_BLEND_WEIGHT = 1;
export const MIN_BLEND_FADE_DURATION = 0;
export const MAX_BLEND_FADE_DURATION = 10;

/** Select the secondary clip for the blend overlay; null clears it. */
export function setBlendClip(id: string | null): void {
  if (id) {
    const target = $clips.get().clips.find((entry) => entry.id === id);
    if (!isReadyClip(target)) {
      return;
    }
  }
  cancelBlendFade();
  $clips.set({
    ...$clips.get(),
    blendClipId: id,
    blendWeight: id ? $clips.get().blendWeight : 0,
  });
}

/** Lerp to the new weight over the current Fade (s) duration (0 = instant). */
export function setBlendWeight(weight: number): void {
  const clamped = Math.min(Math.max(weight, MIN_BLEND_WEIGHT), MAX_BLEND_WEIGHT);
  const duration = $clips.get().blendFadeDuration;
  fadeBlendWeightTo(clamped, duration, (next) => {
    $clips.setKey('blendWeight', next);
  });
}

export function setBlendFadeDuration(duration: number): void {
  const clamped = Math.min(
    Math.max(duration, MIN_BLEND_FADE_DURATION),
    MAX_BLEND_FADE_DURATION,
  );
  $clips.setKey('blendFadeDuration', clamped);
}
