import type { Object3D } from 'three';

import type { ClipEntry } from '@/modules/animation/types/clip';

import { buildSkeletonNodeSet, validateClipAgainstSkeleton } from '@/modules/animation/domain/clip-validate';
import { setMixerTimeScale } from '@/modules/animation/utils/mixer-session';
import { $model } from '@/modules/viewport/stores/model-store';
import { $clips } from '../store';
import { isReadyClip } from '../utils';

/**
 * Re-validate every clip after a model change.
 * - Owned clips validate against their owner's skeleton.
 * - Shared clips validate against the active model (skeleton param).
 */
export function syncClipsToSkeleton(skeleton: Object3D | null): void {
  const state = $clips.get();
  if (!skeleton) {
    setMixerTimeScale(1);
    $clips.set({
      ...state,
      activeClipId: null,
      blendBaseClip: null,
      blendClipId: null,
      blendWeight: 0,
      playing: false,
      duration: 0,
    });
    return;
  }

  const models = $model.get().models;
  const ownerScenes = new Map<string, Object3D>();
  for (const model of models) {
    ownerScenes.set(model.id, model.scene);
  }

  const activeNodeNames = buildSkeletonNodeSet(skeleton);

  const clips = state.clips.map((entry): ClipEntry => {
    if (!entry.clip) {
      return entry;
    }

    const ownerScene = entry.ownerModelId ? ownerScenes.get(entry.ownerModelId) : null;
    const nodeNames = ownerScene ? buildSkeletonNodeSet(ownerScene) : activeNodeNames;

    const validation = validateClipAgainstSkeleton(entry.clip, nodeNames);
    if (!validation.valid) {
      return {
        ...entry,
        status: 'error',
        error: validation.error,
      };
    }
    // Keep draft write-targets as draft; other valid clips stay/become ready.
    return {
      ...entry,
      status: entry.status === 'draft' ? 'draft' : 'ready',
      error: null,
    };
  });

  // Keep an explicit T-pose (null) — do not auto-pick the first ready clip.
  const activeEntry
    = state.activeClipId
      ? clips.find((entry) => entry.id === state.activeClipId) ?? null
      : null;
  const activeClipId
    = activeEntry && isReadyClip(activeEntry)
      ? state.activeClipId
      : null;
  const active = activeClipId ? clips.find((entry) => entry.id === activeClipId) : null;

  const blendClipId
    = state.blendClipId && isReadyClip(clips.find((entry) => entry.id === state.blendClipId))
      ? state.blendClipId
      : null;

  const duration = active?.clip?.duration ?? 0;

  setMixerTimeScale(active?.timeScale ?? 1);
  $clips.set({
    clips,
    activeClipId,
    blendBaseClip: blendClipId ? state.blendBaseClip : null,
    blendClipId,
    blendWeight: blendClipId ? state.blendWeight : 0,
    playing: false,
    loop: state.loop,
    duration,
    trimStart: 0,
    trimEnd: duration,
  });
}
