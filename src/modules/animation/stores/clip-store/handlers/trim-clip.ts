import { trimClipWindow } from '@/modules/animation/services/clip-trim';
import { setMixerTime } from '@/modules/animation/services/mixer-session';
import { $clips } from '../store';
import { isReadyClip } from '../utils';

export function trimClip(start: number, end: number): void {
  const state = $clips.get();
  const active = state.clips.find((entry) => entry.id === state.activeClipId);
  if (!isReadyClip(active)) {
    return;
  }

  const source = active.sourceClip ?? active.clip;
  const duration = source.duration;
  const clampedStart = Math.min(Math.max(start, 0), duration);
  const clampedEnd = Math.min(Math.max(end, 0), duration);
  if (clampedEnd <= clampedStart) {
    return;
  }

  const working = trimClipWindow(source, clampedStart, clampedEnd);

  $clips.set({
    ...state,
    clips: state.clips.map((entry) =>
      entry.id === active.id ? { ...entry, clip: working } : entry,
    ),
    playing: false,
    duration: clampedEnd - clampedStart,
    trimStart: clampedStart,
    trimEnd: clampedEnd,
  });

  setMixerTime(0);
}
