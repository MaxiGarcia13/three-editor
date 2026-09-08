import type { SkinnedMesh } from 'three';
import type * as THREE from 'three';
import type { ModelLoadResult } from '../types/model';

import { parseGltfFile } from '@/utils/glb-parse';

function validateScene(scene: THREE.Group): void {
  let hasSkinnedMesh = false;
  let hasSkeleton = false;

  scene.traverse((child) => {
    if ((child as SkinnedMesh).isSkinnedMesh) {
      hasSkinnedMesh = true;
      if ((child as SkinnedMesh).skeleton) {
        hasSkeleton = true;
      }
    }
  });

  if (!hasSkinnedMesh) {
    throw new Error('Model has no skinned mesh');
  }

  if (!hasSkeleton) {
    throw new Error('Model has no skeleton');
  }
}

export async function loadModelFromFile(file: File): Promise<ModelLoadResult> {
  const { gltf, blobUrl } = await parseGltfFile(file);

  try {
    validateScene(gltf.scene);
  } catch (error) {
    URL.revokeObjectURL(blobUrl);
    throw error;
  }

  return { scene: gltf.scene, blobUrl };
}
