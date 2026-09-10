import type { BoneBindFrame } from '@/modules/animation/types/clip';
import { boneDisplayName } from '@/modules/animation/services/bone-registry';

export interface HipsMappingPair {
  sourceName: string;
  targetName: string;
}

/** True when the bone is Mixamo/canonical hips (display label or name suffix). */
export function isHipsBoneName(boneName: string): boolean {
  if (boneDisplayName(boneName) === 'Hips') {
    return true;
  }
  return /(?:^|[:_])Hips$/i.test(boneName);
}

/**
 * First mapped pair whose source or target is hips. Null when none.
 */
export function resolveHipsMapping(
  mapping: Map<string, string>,
): HipsMappingPair | null {
  for (const [sourceName, targetName] of mapping) {
    if (isHipsBoneName(sourceName) || isHipsBoneName(targetName)) {
      return { sourceName, targetName };
    }
  }
  return null;
}

export function getBindFrame(
  frames: Record<string, BoneBindFrame>,
  boneName: string,
): BoneBindFrame | null {
  return frames[boneName] ?? null;
}
