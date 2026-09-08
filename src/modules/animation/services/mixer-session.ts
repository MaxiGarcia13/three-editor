import type { AnimationAction, AnimationMixer } from 'three';

import { clearPoseDirty } from '@/modules/viewport/stores/pose-edit-store';

let currentMixer: AnimationMixer | null = null;
let currentAction: AnimationAction | null = null;

export function setActiveMixer(mixer: AnimationMixer | null): void {
  currentMixer = mixer;
  if (!mixer) {
    currentAction = null;
  }
}

export function setActiveAction(action: AnimationAction | null): void {
  currentAction = action;
}

/** Stop clip bindings from overwriting a manual pose edit. */
export function suspendMixerBindings(): void {
  if (currentAction) {
    currentAction.enabled = false;
  }
}

export function resumeMixerBindings(): void {
  if (currentAction) {
    currentAction.enabled = true;
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
 * Discard unsaved gizmo edits and re-apply the active clip at the playhead.
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
    currentMixer.setTime(time);
  }
  clearPoseDirty();
}

export function setMixerTimeScale(scale: number): void {
  if (currentMixer) {
    currentMixer.timeScale = scale;
  }
}
