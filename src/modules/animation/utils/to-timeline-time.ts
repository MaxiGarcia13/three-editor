import { $clips } from '../stores/clip-store/store';
import { getMixerTime } from './mixer-session';

/** Map absolute mixer time into the visible [0, duration] timeline window. */
export function toTimelineTime(mixerTime: number, duration: number, loop: boolean): number {
  if (!Number.isFinite(mixerTime) || mixerTime < 0 || duration <= 0) {
    return 0;
  }
  if (loop) {
    return mixerTime % duration;
  }
  return Math.min(mixerTime, duration);
}

export function readClipTimelineTime(): number {
  const { duration, loop } = $clips.get();
  return toTimelineTime(getMixerTime(), duration, loop);
}
