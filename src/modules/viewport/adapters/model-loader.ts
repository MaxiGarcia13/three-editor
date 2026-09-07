import type { SkinnedMesh } from 'three';
import type * as THREE from 'three';
import type { ModelLoadResult } from '../types/model';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { GLTF_EXTENSION_PATTERN } from '../constants/gltf-file';

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
  if (!GLTF_EXTENSION_PATTERN.test(file.name)) {
    throw new Error('Unsupported file type. Please use .glb or .gltf');
  }

  const blobUrl = URL.createObjectURL(file);

  try {
    const loader = new GLTFLoader();

    const scene = await new Promise<THREE.Group>((resolve, reject) => {
      loader.load(
        blobUrl,
        (gltf) => resolve(gltf.scene),
        undefined,
        (error) => reject(error),
      );
    });

    validateScene(scene);

    return { scene, blobUrl };
  } catch (error) {
    URL.revokeObjectURL(blobUrl);
    throw error;
  }
}
