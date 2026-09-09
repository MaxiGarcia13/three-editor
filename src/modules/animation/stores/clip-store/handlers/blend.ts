import type { Object3D } from 'three';

import { bakeBlendClip } from '@/modules/animation/services/blend-bake';
import { buildSkeletonNodeSet, validateClipAgainstSkeleton } from '@/modules/animation/services/clip-validate';
import {
  cancelBlendFade,
  fadeBlendWeightTo,
} from '@/modules/animation/services/mixer-session';
import { $clips } from '../store';
import { applyActiveModelBindOverrides, isReadyClip, nextClipId, toEntry } from '../utils';

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

/** Bake the live blend into a new library clip (viewport blend stays viewport-only). */
export function bakeBlend(scene: Object3D | null): void {
  if (!scene) {
    return;
  }
  const state = $clips.get();
  const primary = state.clips.find((entry) => entry.id === state.activeClipId);
  const secondary = state.clips.find((entry) => entry.id === state.blendClipId);
  if (!isReadyClip(primary) || !isReadyClip(secondary)) {
    return;
  }

  const baked = bakeBlendClip(primary.clip, secondary.clip, state.blendWeight);
  const nodeNames = buildSkeletonNodeSet(scene);
  const validation = validateClipAgainstSkeleton(baked, nodeNames);
  const entry = applyActiveModelBindOverrides(
    toEntry(validation, nextClipId(), baked, 'Baked blend'),
  );

  $clips.setKey('clips', [...state.clips, entry]);
}
