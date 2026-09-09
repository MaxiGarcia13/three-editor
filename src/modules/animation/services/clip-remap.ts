import * as THREE from 'three';

import { splitTrackName } from '@/modules/animation/services/clip-validate';

export interface RemapResult {
  clip: THREE.AnimationClip | null;
  unmappedTargets: string[];
  error: string | null;
}

export function remapClipTracks(
  sourceClip: THREE.AnimationClip,
  mapping: Map<string, string>,
): RemapResult {
  const unmappedTargets = [...new Set(sourceClip.tracks.map((track) =>
    splitTrackName(track.name).nodeName,
  ))].filter((name) => name && !mapping.has(name));

  if (unmappedTargets.length > 0) {
    return {
      clip: null,
      unmappedTargets,
      error: `Unmapped bone targets: ${unmappedTargets.slice(0, 5).join(', ')}`,
    };
  }

  const tracks = sourceClip.tracks.map((track) => {
    const { nodeName, suffix } = splitTrackName(track.name);
    const target = nodeName ? mapping.get(nodeName) : undefined;
    const clone = track.clone();
    if (target !== undefined && suffix) {
      clone.name = target + suffix;
    }
    return clone;
  });

  const clip = new THREE.AnimationClip(
    `${sourceClip.name} (retargeted)`,
    sourceClip.duration,
    tracks,
  );
  return { clip, unmappedTargets: [], error: null };
}
