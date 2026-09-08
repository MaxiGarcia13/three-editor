import type { ClipLoadResult } from '../types/clip';

import { GLTF_EXTENSION_PATTERN, parseGltfFile } from '@/utils/glb-parse';

export async function loadClipsFromFile(file: File): Promise<ClipLoadResult> {
  let blobUrl: string | undefined;

  try {
    const result = await parseGltfFile(file);
    blobUrl = result.blobUrl;
    const { gltf } = result;

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
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
    }
  }
}

function stripExtension(name: string): string {
  return name.replace(GLTF_EXTENSION_PATTERN, '');
}
