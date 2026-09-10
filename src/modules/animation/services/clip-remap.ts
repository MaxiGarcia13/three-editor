import * as THREE from 'three';

import { splitTrackName } from '@/modules/animation/services/clip-validate';

export interface RemapResult {
  clip: THREE.AnimationClip | null;
  /** Source bone names whose tracks were omitted (left unmapped). */
  skippedBones: string[];
  error: string | null;
}

export function remapClipTracks(
  sourceClip: THREE.AnimationClip,
  mapping: Map<string, string>,
  positionScale = 1,
): RemapResult {
  if (mapping.size === 0) {
    return {
      clip: null,
      skippedBones: [],
      error: 'Map at least one bone before applying',
    };
  }

  const skipped = new Set<string>();
  const tracks: THREE.KeyframeTrack[] = [];

  for (const track of sourceClip.tracks) {
    const { nodeName, suffix } = splitTrackName(track.name);
    if (!nodeName) {
      tracks.push(track.clone());
      continue;
    }

    const target = mapping.get(nodeName);
    if (target === undefined) {
      skipped.add(nodeName);
      continue;
    }

    const clone = track.clone();
    if (suffix) {
      clone.name = target + suffix;
    }
    if (suffix === '.position' && positionScale !== 1) {
      const values = clone.values;
      for (let i = 0; i < values.length; i += 1) {
        values[i] *= positionScale;
      }
    }
    tracks.push(clone);
  }

  if (tracks.length === 0) {
    return {
      clip: null,
      skippedBones: [...skipped],
      error: 'No tracks left after skipping unmapped bones',
    };
  }

  const clip = new THREE.AnimationClip(
    `${sourceClip.name} (retargeted)`,
    sourceClip.duration,
    tracks,
  );
  return { clip, skippedBones: [...skipped], error: null };
}
