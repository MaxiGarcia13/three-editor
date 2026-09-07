import type { GLTF } from 'three/addons/loaders/GLTFLoader.js';
import type { ClipLoadResult } from '../types/clip';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { GLTF_EXTENSION_PATTERN } from '@/modules/viewport/constants/gltf-file';

export async function loadClipsFromFile(file: File): Promise<ClipLoadResult> {
  if (!GLTF_EXTENSION_PATTERN.test(file.name)) {
    throw new Error('Unsupported animation file type. Please use .glb or .gltf');
  }

  const blobUrl = URL.createObjectURL(file);

  try {
    const loader = new GLTFLoader();
    const gltf = await new Promise<GLTF>((resolve, reject) => {
      loader.load(
        blobUrl,
        (result) => resolve(result),
        undefined,
        (error) => reject(error),
      );
    });

    if (!gltf.animations || gltf.animations.length === 0) {
      throw new Error(`File "${file.name}" contains no animation clips`);
    }

    return {
      name: stripExtension(file.name),
      clips: gltf.animations,
    };
  } catch (error) {
    if (error instanceof Error && error.message === `File "${file.name}" contains no animation clips`) {
      throw error;
    }
    const message = error instanceof Error ? error.message : 'Failed to load animation file';
    throw new Error(`Failed to load "${file.name}": ${message}`);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

function stripExtension(name: string): string {
  return name.replace(GLTF_EXTENSION_PATTERN, '');
}
