import type { AnimationClip } from 'three';

export function trimClipWindow(clip: AnimationClip, start: number, end: number): AnimationClip {
  const duration = Math.max(end - start, 0);
  const clone = clip.clone();

  for (const track of clone.tracks) {
    track.trim(start, end);
    const times = track.times;
    for (let i = 0; i < times.length; i++) {
      times[i] -= start;
    }
  }

  clone.duration = duration;
  clone.resetDuration();
  return clone;
}
