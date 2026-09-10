import type { Object3D } from 'three';

import { remapClipTracks } from '@/modules/animation/services/clip-remap';
import { setMixerTime, setMixerTimeScale } from '@/modules/animation/services/mixer-session';
import {
  applyBoneRenames,
  buildBoneRenamesForScene,
} from '@/modules/animation/services/normalize-scene-bones';
import { $model } from '@/modules/viewport/stores/model-store';
import { $clips } from '../store';
import { applyActiveModelBindOverrides } from '../utils';
import { syncClipsToSkeleton } from './sync-clips-to-skeleton';

export type RetargetScope = 'active' | 'all';

export interface RetargetClipOptions {
  scope: RetargetScope;
  /** Previewed model scene — used to re-sync after apply. */
  activeScene: Object3D | null;
}

export interface RetargetClipResult {
  clipId: string | null;
  error: string | null;
}

function retargetActive(
  id: string,
  mapping: Map<string, string>,
): RetargetClipResult {
  const state = $clips.get();
  const source = state.clips.find((entry) => entry.id === id);
  if (!source?.clip) {
    return { clipId: null, error: 'Clip not found' };
  }

  const result = remapClipTracks(source.clip, mapping);
  if (!result.clip || result.error) {
    return { clipId: null, error: result.error ?? 'Remap failed' };
  }

  const newEntry = applyActiveModelBindOverrides({
    id: `${source.id}-retargeted`,
    name: result.clip.name,
    sourceFile: source.sourceFile,
    clip: result.clip,
    sourceClip: result.clip,
    status: 'ready' as const,
    error: null,
    timeScale: source.timeScale,
    sourceBindLengths: source.sourceBindLengths ?? {},
  });

  const clips = [...state.clips, newEntry];
  const duration = newEntry.clip?.duration ?? result.clip.duration;
  $clips.set({
    ...state,
    clips,
    activeClipId: newEntry.id,
    playing: false,
    duration,
    trimStart: 0,
    trimEnd: duration,
  });

  setMixerTime(0);
  setMixerTimeScale(newEntry.timeScale);
  return { clipId: newEntry.id, error: null };
}

function retargetAllModels(
  id: string,
  mapping: Map<string, string>,
  activeScene: Object3D | null,
): RetargetClipResult {
  const state = $clips.get();
  const source = state.clips.find((entry) => entry.id === id);
  if (!source?.clip) {
    return { clipId: null, error: 'Clip not found' };
  }

  const models = $model.get().models;
  if (models.length === 0) {
    return { clipId: null, error: 'No models loaded' };
  }

  const planned: { scene: Object3D; renames: Map<string, string> }[] = [];

  for (const model of models) {
    const { renames, error } = buildBoneRenamesForScene(model.scene, mapping);
    if (error) {
      return {
        clipId: null,
        error: `${model.fileName}: ${error}`,
      };
    }
    planned.push({ scene: model.scene, renames });
  }

  const result = remapClipTracks(source.clip, mapping);
  if (!result.clip || result.error) {
    return { clipId: null, error: result.error ?? 'Remap failed' };
  }

  for (const { scene, renames } of planned) {
    applyBoneRenames(scene, renames);
  }

  const remapped = applyActiveModelBindOverrides({
    ...source,
    name: result.clip.name,
    clip: result.clip,
    sourceClip: result.clip,
    status: 'ready' as const,
    error: null,
  });

  const clips = state.clips.map((entry) => (entry.id === id ? remapped : entry));
  const duration = remapped.clip?.duration ?? result.clip.duration;

  $clips.set({
    ...state,
    clips,
    activeClipId: id,
    playing: false,
    duration,
    trimStart: 0,
    trimEnd: duration,
  });

  syncClipsToSkeleton(activeScene);
  setMixerTime(0);
  setMixerTimeScale(remapped.timeScale);
  return { clipId: id, error: null };
}

export function retargetClip(
  id: string,
  mapping: Map<string, string>,
  options: RetargetClipOptions = { scope: 'active', activeScene: null },
): RetargetClipResult {
  if (options.scope === 'all') {
    return retargetAllModels(id, mapping, options.activeScene);
  }
  return retargetActive(id, mapping);
}
