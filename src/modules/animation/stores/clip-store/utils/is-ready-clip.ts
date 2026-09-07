import type { AnimationClip } from 'three';

import type { ClipEntry } from '@/modules/animation/types/clip';

export function isReadyClip(
  entry: ClipEntry | undefined,
): entry is ClipEntry & { clip: AnimationClip } {
  return Boolean(entry && entry.status === 'ready' && entry.clip);
}
