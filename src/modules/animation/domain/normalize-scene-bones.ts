import type { Object3D } from 'three';

import { Bone } from 'three';

import {
  buildTargetBoneNames,
  suggestTargetBone,
} from '@/modules/animation/domain/bone-registry';

export interface BoneNormalizeResult {
  renames: Map<string, string>;
  error: string | null;
}

/**
 * For each clip source → canonical target name, find which bone on `scene`
 * should be renamed so the remapped clip binds.
 */
export function buildBoneRenamesForScene(
  scene: Object3D,
  sourceToCanonical: Map<string, string>,
): BoneNormalizeResult {
  const boneNames = buildTargetBoneNames(scene);
  const renames = new Map<string, string>();
  const unresolved: string[] = [];

  for (const [sourceName, canonical] of sourceToCanonical) {
    // Already has the target name the remapped clip will use.
    if (boneNames.has(canonical)) {
      continue;
    }

    const resolved = boneNames.has(sourceName)
      ? sourceName
      : suggestTargetBone(sourceName, boneNames);

    if (!resolved || !boneNames.has(resolved)) {
      unresolved.push(sourceName);
      continue;
    }

    if (resolved === canonical) {
      continue;
    }

    const existing = renames.get(resolved);
    if (existing && existing !== canonical) {
      return {
        renames: new Map(),
        error: `Bone "${resolved}" would map to both "${existing}" and "${canonical}"`,
      };
    }
    renames.set(resolved, canonical);
  }

  if (unresolved.length > 0) {
    const sample = unresolved.slice(0, 5).join(', ');
    return {
      renames: new Map(),
      error: `Could not resolve bones on this model: ${sample}`,
    };
  }

  return { renames, error: null };
}

/** Two-pass rename so swaps (A→B, B→A) do not collide. */
export function applyBoneRenames(scene: Object3D, renames: Map<string, string>): void {
  if (renames.size === 0) {
    return;
  }

  const bonesByName = new Map<string, Bone[]>();
  scene.traverse((object) => {
    if (!(object instanceof Bone) || !object.name) {
      return;
    }
    const list = bonesByName.get(object.name) ?? [];
    list.push(object);
    bonesByName.set(object.name, list);
  });

  const temps = new Map<Bone, string>();
  let tempIndex = 0;

  for (const [from, to] of renames) {
    if (from === to) {
      continue;
    }
    const bones = bonesByName.get(from);
    if (!bones?.length) {
      continue;
    }
    for (const bone of bones) {
      const temp = `__retarget_tmp_${tempIndex++}`;
      bone.name = temp;
      temps.set(bone, to);
    }
  }

  for (const [bone, to] of temps) {
    bone.name = to;
  }
}
