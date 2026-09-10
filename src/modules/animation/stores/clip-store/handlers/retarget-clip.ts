import type { Object3D } from 'three';
import type { RemapClipOptions } from '@/modules/animation/services/clip-remap';
import type { BoneBindFrame } from '@/modules/animation/types/clip';

import { captureBindFrames } from '@/modules/animation/services/bind-frame';
import { computePositionScaleRatio } from '@/modules/animation/services/bind-length-ratio';
import { remapClipTracks } from '@/modules/animation/services/clip-remap';
import { splitTrackName } from '@/modules/animation/services/clip-validate';
import { getBindFrame, resolveHipsMapping } from '@/modules/animation/services/hips-mapping';
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
  /** Previewed model scene — source of target bind lengths/frames and re-sync. */
  activeScene: Object3D | null;
}

export interface RetargetClipResult {
  clipId: string | null;
  error: string | null;
}

const NO_SCALE_PAIRS_ERROR
  = 'No usable source/target bone pairs for position scale — the clip or model may have no bones';

const NO_HIPS_REBASE_ERROR
  = 'Cannot rebase hips for position tracks — map Hips and ensure the clip/model skeletons loaded correctly';

function clipHasPositionTracks(clip: { tracks: { name: string }[] }): boolean {
  return clip.tracks.some((track) => splitTrackName(track.name).suffix === '.position');
}

function computeScaleOrFail(
  sourceBindLengths: Record<string, number>,
  mapping: Map<string, string>,
  activeScene: Object3D | null,
): { ratio: number } | { error: string } {
  if (!activeScene) {
    return { error: NO_SCALE_PAIRS_ERROR };
  }
  const ratio = computePositionScaleRatio(mapping, sourceBindLengths, activeScene);
  return ratio === null ? { error: NO_SCALE_PAIRS_ERROR } : { ratio };
}

function buildRemapOptionsOrFail(
  mapping: Map<string, string>,
  sourceBindFrames: Record<string, BoneBindFrame>,
  activeScene: Object3D | null,
  positionScale: number,
  sourceClip: { tracks: { name: string }[] },
): { options: RemapClipOptions } | { error: string } {
  const options: RemapClipOptions = { positionScale };

  if (!clipHasPositionTracks(sourceClip)) {
    return { options };
  }

  const hips = resolveHipsMapping(mapping);
  if (!hips || !activeScene) {
    return { error: NO_HIPS_REBASE_ERROR };
  }

  const sourceFrame = getBindFrame(sourceBindFrames, hips.sourceName);
  const targetFrames = captureBindFrames(activeScene);
  const targetFrame = getBindFrame(targetFrames, hips.targetName);
  if (
    !sourceFrame?.localPosition
    || !targetFrame?.localPosition
    || !sourceFrame.parentWorldQuaternion
    || !targetFrame.parentWorldQuaternion
  ) {
    return { error: NO_HIPS_REBASE_ERROR };
  }

  options.hipsSourceBone = hips.sourceName;
  options.hipsRebase = {
    sourceParentWorldQuaternion: sourceFrame.parentWorldQuaternion,
    targetParentWorldQuaternion: targetFrame.parentWorldQuaternion,
    sourceBindLocalPosition: sourceFrame.localPosition,
    targetBindLocalPosition: targetFrame.localPosition,
  };
  return { options };
}

function retargetActive(
  id: string,
  mapping: Map<string, string>,
  activeScene: Object3D | null,
): RetargetClipResult {
  const state = $clips.get();
  const source = state.clips.find((entry) => entry.id === id);
  if (!source?.clip) {
    return { clipId: null, error: 'Clip not found' };
  }

  const scale = computeScaleOrFail(source.sourceBindLengths, mapping, activeScene);
  if ('error' in scale) {
    return { clipId: null, error: scale.error };
  }

  const remapOpts = buildRemapOptionsOrFail(
    mapping,
    source.sourceBindFrames ?? {},
    activeScene,
    scale.ratio,
    source.clip,
  );
  if ('error' in remapOpts) {
    return { clipId: null, error: remapOpts.error };
  }

  const result = remapClipTracks(source.clip, mapping, remapOpts.options);
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
    sourceBindFrames: source.sourceBindFrames ?? {},
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

  const scale = computeScaleOrFail(source.sourceBindLengths, mapping, activeScene);
  if ('error' in scale) {
    return { clipId: null, error: scale.error };
  }

  const remapOpts = buildRemapOptionsOrFail(
    mapping,
    source.sourceBindFrames ?? {},
    activeScene,
    scale.ratio,
    source.clip,
  );
  if ('error' in remapOpts) {
    return { clipId: null, error: remapOpts.error };
  }

  const result = remapClipTracks(source.clip, mapping, remapOpts.options);
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
  return retargetActive(id, mapping, options.activeScene);
}
