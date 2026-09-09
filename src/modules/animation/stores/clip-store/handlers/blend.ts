import type { AnimationClip } from 'three';

import { bakeBlendClip } from '@/modules/animation/services/blend-bake';
import {
  cancelBlendFade,
  fadeBlendWeightTo,
  restoreMixerPose,
} from '@/modules/animation/services/mixer-session';
import { $clips } from '../store';
import { isReadyClip } from '../utils';

export const MIN_BLEND_WEIGHT = 0;
export const MAX_BLEND_WEIGHT = 1;
export const MIN_BLEND_FADE_DURATION = 0;
export const MAX_BLEND_FADE_DURATION = 10;

function captureBlendBase(): AnimationClip | null {
  const state = $clips.get();
  const active = state.clips.find((entry) => entry.id === state.activeClipId);
  if (!isReadyClip(active)) {
    return null;
  }
  return active.clip.clone();
}

/** Bake primary + secondary at weight; output duration is the longer clip. */
function bakeAtWeight(
  primary: AnimationClip,
  secondary: AnimationClip,
  weight: number,
): AnimationClip {
  const primaryForBake
    = secondary.duration > primary.duration ? secondary : primary;
  const secondaryForBake
    = primaryForBake === primary ? secondary : primary;
  return bakeBlendClip(primaryForBake, secondaryForBake, weight);
}

/** Write the current blend settings into the active library clip. */
function commitBlendToActive(): void {
  const state = $clips.get();
  const active = state.clips.find((entry) => entry.id === state.activeClipId);
  if (!isReadyClip(active)) {
    return;
  }

  const base = state.blendBaseClip ?? active.clip;

  if (!state.blendClipId || state.blendWeight <= 0) {
    if (state.blendBaseClip) {
      const restored = state.blendBaseClip.clone();
      restored.name = active.name;
      $clips.set({
        ...state,
        clips: state.clips.map((entry) =>
          entry.id === active.id ? { ...entry, clip: restored } : entry,
        ),
        duration: restored.duration,
        trimEnd: restored.duration,
      });
      restoreMixerPose();
    }
    return;
  }

  const secondary = state.clips.find((entry) => entry.id === state.blendClipId);
  if (!isReadyClip(secondary)) {
    return;
  }

  const baked = bakeAtWeight(base, secondary.clip, state.blendWeight);
  baked.name = active.name;

  $clips.set({
    ...state,
    clips: state.clips.map((entry) =>
      entry.id === active.id ? { ...entry, clip: baked } : entry,
    ),
    duration: baked.duration,
    trimEnd: baked.duration,
  });
  restoreMixerPose();
}

/** Select the secondary clip for the blend overlay; null clears it. */
export function setBlendClip(id: string | null): void {
  const state = $clips.get();
  if (id) {
    const target = state.clips.find((entry) => entry.id === id);
    if (!isReadyClip(target) || target.id === state.activeClipId) {
      return;
    }
  }

  cancelBlendFade();

  if (!id) {
    const active = state.clips.find((entry) => entry.id === state.activeClipId);
    if (state.blendBaseClip && isReadyClip(active)) {
      const restored = state.blendBaseClip.clone();
      restored.name = active.name;
      $clips.set({
        ...state,
        clips: state.clips.map((entry) =>
          entry.id === active.id ? { ...entry, clip: restored } : entry,
        ),
        blendClipId: null,
        blendWeight: 0,
        blendBaseClip: null,
        duration: restored.duration,
        trimEnd: restored.duration,
      });
    } else {
      $clips.set({
        ...state,
        blendClipId: null,
        blendWeight: 0,
        blendBaseClip: null,
      });
    }
    restoreMixerPose();
    return;
  }

  const blendBaseClip
    = state.blendClipId === null
      ? captureBlendBase()
      : state.blendBaseClip ?? captureBlendBase();
  const nextWeight = state.blendClipId === null ? 0 : state.blendWeight;
  $clips.set({
    ...state,
    blendClipId: id,
    blendWeight: nextWeight,
    blendBaseClip,
  });

  if (nextWeight > 0) {
    commitBlendToActive();
  }
}

/** Lerp to the new weight over the current Fade (s) duration (0 = instant). */
export function setBlendWeight(weight: number): void {
  const clamped = Math.min(Math.max(weight, MIN_BLEND_WEIGHT), MAX_BLEND_WEIGHT);
  const duration = $clips.get().blendFadeDuration;
  fadeBlendWeightTo(clamped, duration, (next) => {
    $clips.setKey('blendWeight', next);
    if (Math.abs(next - clamped) < 1e-6) {
      commitBlendToActive();
    }
  });
}

export function setBlendFadeDuration(duration: number): void {
  const clamped = Math.min(
    Math.max(duration, MIN_BLEND_FADE_DURATION),
    MAX_BLEND_FADE_DURATION,
  );
  $clips.setKey('blendFadeDuration', clamped);
}
