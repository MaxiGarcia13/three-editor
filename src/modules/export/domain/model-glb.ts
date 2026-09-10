import type { AnimationClip } from 'three';

import type { ClipEntry } from '@/modules/animation/types/clip';
import type { ModelEntry } from '@/modules/viewport/types/model';

import { bakeTimeScale } from '@/modules/animation/domain/clip-bake';
import {
  buildSkeletonNodeSet,
  validateClipAgainstSkeleton,
} from '@/modules/animation/domain/clip-validate';
import { exportGlbBinary } from '../adapters/gltf-exporter';
import { stripGlbExtension } from '../utils/file-name';

export interface ModelGlbResult {
  arrayBuffer: ArrayBuffer;
  fileName: string;
}

export async function packModelGlb(
  model: ModelEntry,
  clips: ClipEntry[],
): Promise<ModelGlbResult> {
  const nodeNames = buildSkeletonNodeSet(model.scene);
  const animations: AnimationClip[] = [];

  for (const entry of clips) {
    if (entry.clip && validateClipAgainstSkeleton(entry.clip, nodeNames).valid) {
      animations.push(bakeTimeScale(entry.clip, entry.timeScale));
    }
  }

  const arrayBuffer = await exportGlbBinary(model.scene, animations);
  return { arrayBuffer, fileName: `${stripGlbExtension(model.fileName)}.glb` };
}
