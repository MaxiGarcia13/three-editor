import { GLTF_EXTENSION_PATTERN } from '@/utils/glb-parse';

export function stripGlbExtension(fileName: string): string {
  return fileName.replace(GLTF_EXTENSION_PATTERN, '');
}
