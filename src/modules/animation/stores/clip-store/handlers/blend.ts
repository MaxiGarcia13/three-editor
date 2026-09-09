import type { AnimationClip } from 'three';

import { bakeBlendClip } from '@/modules/animation/services/blend-bake';
import {
  cancelBlendFade,
  restoreMixerPose,
  setBlendWeight as setMixerBlendWeight,
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

function clearBlendForm(extra?: Partial<ReturnType<typeof $clips.get>>): void {
  cancelBlendFade();
  $clips.set({
    ...$clips.get(),
    ...extra,
    blendClipId: null,
    blendWeight: 0,
    blendBaseClip: null,
  });
}

/** Select the secondary clip for the blend overlay; null clears it (live preview only). */
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
    $clips.set({
      ...state,
      blendClipId: null,
      blendWeight: 0,
      blendBaseClip: null,
    });
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
}

/** Snap weight immediately — slider should not crawl over Fade (s). Viewport only. */
export function setBlendWeight(weight: number): void {
  const clamped = Math.min(Math.max(weight, MIN_BLEND_WEIGHT), MAX_BLEND_WEIGHT);
  cancelBlendFade();
  setMixerBlendWeight(clamped);
  $clips.setKey('blendWeight', clamped);
}

export function setBlendFadeDuration(duration: number): void {
  const clamped = Math.min(
    Math.max(duration, MIN_BLEND_FADE_DURATION),
    MAX_BLEND_FADE_DURATION,
  );
  $clips.setKey('blendFadeDuration', clamped);
}

/**
 * Bake the live blend into the active library clip, then reset the blend form.
 * Sources stay unchanged; the active clip receives the flattened result.
 */
export function bakeBlend(): void {
  const state = $clips.get();
  const active = state.clips.find((entry) => entry.id === state.activeClipId);
  if (!isReadyClip(active) || !state.blendClipId || state.blendWeight <= 0) {
    return;
  }

  const secondary = state.clips.find((entry) => entry.id === state.blendClipId);
  if (!isReadyClip(secondary)) {
    return;
  }

  const base = state.blendBaseClip ?? active.clip;
  const baked = bakeAtWeight(base, secondary.clip, state.blendWeight);
  baked.name = active.name;

  clearBlendForm({
    clips: state.clips.map((entry) =>
      entry.id === active.id ? { ...entry, clip: baked } : entry,
    ),
    playing: false,
    duration: baked.duration,
    trimStart: 0,
    trimEnd: baked.duration,
  });
  restoreMixerPose();
}

/** Discard live blend overlay and reset the form without writing the active clip. */
export function resetBlend(): void {
  const state = $clips.get();
  cancelBlendFade();
  $clips.set({
    ...state,
    blendClipId: null,
    blendWeight: 0,
    blendBaseClip: null,
  });
  restoreMixerPose();
}
