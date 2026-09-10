import type { AnimationClip } from 'three';

/** Divides track times and duration by `scale` so the clip plays identically at timeScale 1. */
export function bakeTimeScale(clip: AnimationClip, scale: number): AnimationClip {
  if (scale === 1) {
    return clip;
  }

  const factor = 1 / scale;
  const clone = clip.clone();

  for (const track of clone.tracks) {
    const times = track.times;
    for (let i = 0; i < times.length; i++) {
      times[i] *= factor;
    }
  }

  clone.duration = clip.duration * factor;
  return clone;
}
