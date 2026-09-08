import type { GLTF } from 'three/addons/loaders/GLTFLoader.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/** HTML `<input type="file">` accept list for GLB/GLTF. */
export const GLTF_FILE_ACCEPT = '.glb,.gltf';

/** Case-insensitive filename match for `.glb` / `.gltf`. */
export const GLTF_EXTENSION_PATTERN = /\.(?:glb|gltf)$/i;

export interface GltfParseResult {
  gltf: GLTF;
  blobUrl: string;
}

export async function parseGltfFile(file: File): Promise<GltfParseResult> {
  if (!GLTF_EXTENSION_PATTERN.test(file.name)) {
    throw new Error('Unsupported file type. Please use .glb or .gltf');
  }

  const blobUrl = URL.createObjectURL(file);

  try {
    const loader = new GLTFLoader();
    const gltf = await new Promise<GLTF>((resolve, reject) => {
      loader.load(blobUrl, (result) => resolve(result), undefined, (error) => reject(error));
    });
    return { gltf, blobUrl };
  } catch (error) {
    URL.revokeObjectURL(blobUrl);
    throw error;
  }
}
