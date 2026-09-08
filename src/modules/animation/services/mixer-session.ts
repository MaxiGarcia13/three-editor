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

export function getActiveMixer(): AnimationMixer | null {
  return currentMixer;
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

export function setMixerTimeScale(scale: number): void {
  if (currentMixer) {
    currentMixer.timeScale = scale;
  }
}
