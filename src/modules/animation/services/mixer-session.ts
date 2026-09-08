import type { AnimationMixer } from 'three';

let currentMixer: AnimationMixer | null = null;

export function setActiveMixer(mixer: AnimationMixer | null): void {
  currentMixer = mixer;
}

export function getActiveMixer(): AnimationMixer | null {
  return currentMixer;
}

export function getMixerTime(): number {
  return currentMixer ? currentMixer.time : 0;
}

export function setMixerTime(time: number): void {
  if (currentMixer) {
    currentMixer.setTime(time);
  }
}

export function setMixerTimeScale(scale: number): void {
  if (currentMixer) {
    currentMixer.timeScale = scale;
  }
}
