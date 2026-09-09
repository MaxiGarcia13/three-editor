import type { Object3D } from 'three';

import type { ClipEntry } from '@/modules/animation/types/clip';

import { buildSkeletonNodeSet, validateClipAgainstSkeleton } from '@/modules/animation/services/clip-validate';
import { $clips } from '../store';
import { isReadyClip } from '../utils';

export function syncClipsToSkeleton(skeleton: Object3D | null): void {
  const state = $clips.get();
  if (!skeleton) {
    $clips.set({
      ...state,
      activeClipId: null,
      playing: false,
      duration: 0,
    });
    return;
  }

  const nodeNames = buildSkeletonNodeSet(skeleton);
  const clips = state.clips.map((entry): ClipEntry => {
    if (!entry.clip) {
      return entry;
    }
    const validation = validateClipAgainstSkeleton(entry.clip, nodeNames);
    return {
      ...entry,
      status: validation.valid ? 'ready' : 'error',
      error: validation.valid ? null : validation.error,
    };
  });

  // Keep an explicit T-pose (null) — do not auto-pick the first ready clip.
  const activeClipId
    = state.activeClipId && isReadyClip(clips.find((entry) => entry.id === state.activeClipId))
      ? state.activeClipId
      : null;
  const active = activeClipId ? clips.find((entry) => entry.id === activeClipId) : null;

  $clips.set({
    clips,
    activeClipId,
    playing: false,
    loop: state.loop,
    duration: active?.clip?.duration ?? 0,
    trimStart: 0,
    trimEnd: active?.clip?.duration ?? 0,
    timeScale: state.timeScale,
  });
}
