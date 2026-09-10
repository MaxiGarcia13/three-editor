import type { Object3D } from 'three';
import type { ClipEntry } from '@/modules/animation/types/clip';

import { useEffect, useMemo, useState } from 'react';
import {
  buildAutoMapping,
  buildTargetBoneNames,
} from '@/modules/animation/domain/bone-registry';
import { splitTrackName } from '@/modules/animation/domain/clip-validate';

export interface RetargetState {
  sourceBones: string[];
  targetBoneNames: Set<string>;
  mapping: Map<string, string>;
  mappedCount: number;
  complete: boolean;
  setMapping: (mapping: Map<string, string>) => void;
}

export function useRetarget(
  entry: ClipEntry | undefined,
  scene: Object3D | null,
): RetargetState {
  const sourceBones = useMemo(
    () => (entry?.clip
      ? [...new Set(entry.clip.tracks.map((track) => splitTrackName(track.name).nodeName))]
      : []),
    [entry],
  );

  const targetBoneNames = useMemo(
    () => (scene ? buildTargetBoneNames(scene) : new Set<string>()),
    [scene],
  );

  const [mapping, setMapping] = useState<Map<string, string>>(() => new Map());

  useEffect(() => {
    setMapping(buildAutoMapping(sourceBones, targetBoneNames));
  }, [sourceBones, targetBoneNames]);

  const mappedCount = sourceBones.reduce((count, name) => {
    const target = mapping.get(name);
    return target && targetBoneNames.has(target) ? count + 1 : count;
  }, 0);

  /** At least one bone mapped — unmapped bones are skipped (tracks dropped) on Apply. */
  const complete = mappedCount > 0;

  return { sourceBones, targetBoneNames, mapping, mappedCount, complete, setMapping };
}
