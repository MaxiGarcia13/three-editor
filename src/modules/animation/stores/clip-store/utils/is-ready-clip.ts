import type { AnimationClip } from 'three';

import type { ClipEntry } from '@/modules/animation/types/clip';

/** Playable / editable library clip (ready or draft with clip data). */
export function isReadyClip(
  entry: ClipEntry | undefined,
): entry is ClipEntry & { clip: AnimationClip } {
  return Boolean(entry && entry.clip && entry.status !== 'error');
}
