import type { AnimationAction, AnimationMixer } from 'three';

import { clearPoseDirty } from '@/modules/viewport/stores/pose-edit-store';

let currentMixer: AnimationMixer | null = null;
let currentAction: AnimationAction | null = null;
let blendAction: AnimationAction | null = null;
let blendWeight = 0;

export function setActiveMixer(mixer: AnimationMixer | null): void {
  currentMixer = mixer;
  if (!mixer) {
    currentAction = null;
    blendAction = null;
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

/** Blend weight given to the secondary action; the primary gets 1 - weight. */
export function setBlendWeight(weight: number): void {
  blendWeight = Math.min(Math.max(weight, 0), 1);
  currentAction?.setEffectiveWeight(1 - blendWeight);
  blendAction?.setEffectiveWeight(blendWeight);
}

/** Explicit A→B cross-fade from the primary clip into the blended clip. */
export function crossFadeToBlend(duration: number): void {
  if (currentAction && blendAction) {
    currentAction.crossFadeTo(blendAction, Math.max(duration, 0), false);
  }
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
    currentMixer.setTime(time);
  }
  clearPoseDirty();
}

export function setMixerTimeScale(scale: number): void {
  if (currentMixer) {
    currentMixer.timeScale = scale;
  }
}
