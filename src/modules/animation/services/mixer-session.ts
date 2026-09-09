import type { AnimationAction, AnimationMixer } from 'three';

import { clearPoseDirty } from '@/modules/viewport/stores/pose-edit-store';

let currentMixer: AnimationMixer | null = null;
let currentAction: AnimationAction | null = null;
let blendAction: AnimationAction | null = null;
let blendWeight = 0;
let blendFadeRaf = 0;

export function setActiveMixer(mixer: AnimationMixer | null): void {
  currentMixer = mixer;
  if (!mixer) {
    currentAction = null;
    blendAction = null;
    cancelBlendFade();
  }
}

export function setActiveAction(action: AnimationAction | null): void {
  currentAction = action;
  if (action) {
    action.setEffectiveWeight(1 - blendWeight);
  }
}

export function setBlendAction(action: AnimationAction | null): void {
  blendAction = action;
  if (action) {
    action.setEffectiveWeight(blendWeight);
  }
}

function applyBlendWeights(): void {
  currentAction?.setEffectiveWeight(1 - blendWeight);
  blendAction?.setEffectiveWeight(blendWeight);
}

/** Re-evaluate bindings at the current playhead (needed when paused — no mixer.update). */
function flushMixerPose(): void {
  if (currentMixer) {
    currentMixer.setTime(currentMixer.time);
  }
}

/** Blend weight given to the secondary action; the primary gets 1 - weight. */
export function setBlendWeight(weight: number): void {
  blendWeight = Math.min(Math.max(weight, 0), 1);
  applyBlendWeights();
  flushMixerPose();
}

export function getBlendWeight(): number {
  return blendWeight;
}

export function cancelBlendFade(): void {
  if (blendFadeRaf !== 0) {
    cancelAnimationFrame(blendFadeRaf);
    blendFadeRaf = 0;
  }
}

/**
 * A→B fade by lerping effective weights (primary = 1−w, blend = w).
 *
 * Do not use AnimationAction.crossFadeTo here: that path assumes both actions
 * start at weight 1 and owns its own fade interpolants. Combined with
 * setEffectiveWeight it can leave total weight < 1, which blends toward bind
 * pose (the “weird T-pose”).
 */
export function fadeBlendWeightTo(
  targetWeight: number,
  durationSeconds: number,
  onWeight: (weight: number) => void,
): void {
  cancelBlendFade();

  const target = Math.min(Math.max(targetWeight, 0), 1);
  const durationMs = Math.max(durationSeconds, 0) * 1000;
  const start = blendWeight;

  if (durationMs === 0 || start === target) {
    setBlendWeight(target);
    onWeight(target);
    return;
  }

  const startedAt = performance.now();

  function tick(now: number): void {
    const t = Math.min((now - startedAt) / durationMs, 1);
    setBlendWeight(start + (target - start) * t);
    onWeight(blendWeight);
    if (t < 1) {
      blendFadeRaf = requestAnimationFrame(tick);
      return;
    }
    blendFadeRaf = 0;
  }

  blendFadeRaf = requestAnimationFrame(tick);
}

/** Stop clip bindings from overwriting a manual pose edit. */
export function suspendMixerBindings(): void {
  if (currentAction) {
    currentAction.enabled = false;
  }
  if (blendAction) {
    blendAction.enabled = false;
  }
}

export function resumeMixerBindings(): void {
  if (currentAction) {
    currentAction.enabled = true;
  }
  if (blendAction) {
    blendAction.enabled = true;
  }
}

export function getMixerTime(): number {
  return currentMixer ? currentMixer.time : 0;
}

export function setMixerTime(time: number): void {
  resumeMixerBindings();
  if (currentMixer) {
    currentMixer.setTime(time);
  }
  clearPoseDirty();
}

/**
 * Discard unsaved gizmo edits and re-apply the active clip(s) at the playhead.
 *
 * Plain setTime(t) is not enough: Three's PropertyMixer skips writing when the
 * resampled clip values match the previous accumulation (same playhead), so the
 * preview keeps the edited bone/mesh TRS. stop()+play() re-snapshots bindings
 * from the current scene, then setTime writes the clip pose back.
 */
export function restoreMixerPose(): void {
  resumeMixerBindings();
  if (currentMixer && currentAction) {
    const time = currentMixer.time;
    currentAction.stop();
    currentAction.play();
    if (blendAction) {
      blendAction.stop();
      blendAction.play();
    }
    applyBlendWeights();
    currentMixer.setTime(time);
  }
  clearPoseDirty();
}

export function setMixerTimeScale(scale: number): void {
  if (currentMixer) {
    currentMixer.timeScale = scale;
  }
}
