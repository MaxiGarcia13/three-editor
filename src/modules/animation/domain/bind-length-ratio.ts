import type { Object3D } from 'three';

import { captureBindLengths } from '@/modules/animation/domain/bone-registry';

/** Skip near-zero bind lengths — degenerate bones offer no usable ratio. */
export const BIND_LENGTH_EPSILON = 1e-6;

/**
 * Median rest-pose length ratio `target/source` over mapped bone pairs where
 * both bind-position lengths exceed `BIND_LENGTH_EPSILON`. Null when no usable
 * pair exists (missing bind lengths or all degenerate).
 */
export function computePositionScaleRatio(
  mapping: Map<string, string>,
  sourceBindLengths: Record<string, number>,
  scene: Object3D,
): number | null {
  const targetBindLengths = captureBindLengths(scene);
  const samples: number[] = [];

  for (const [sourceName, targetName] of mapping) {
    const sourceLen = sourceBindLengths[sourceName];
    const targetLen = targetBindLengths[targetName];
    if (sourceLen === undefined || targetLen === undefined) {
      continue;
    }
    if (
      sourceLen <= BIND_LENGTH_EPSILON
      || targetLen <= BIND_LENGTH_EPSILON
    ) {
      continue;
    }
    samples.push(targetLen / sourceLen);
  }

  if (samples.length === 0) {
    return null;
  }

  samples.sort((a, b) => a - b);
  const mid = Math.floor(samples.length / 2);
  return samples.length % 2 === 1
    ? samples[mid]
    : (samples[mid - 1] + samples[mid]) / 2;
}
