import { GLTF_EXTENSION_PATTERN } from '@/utils/glb-parse';

export function stripGlbExtension(fileName: string): string {
  return fileName.replace(GLTF_EXTENSION_PATTERN, '');
}

export function uniqueFileName(fileName: string, taken: Set<string>): string {
  if (!taken.has(fileName)) {
    return fileName;
  }

  const dotIndex = fileName.lastIndexOf('.');
  const base = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
  const extension = dotIndex > 0 ? fileName.slice(dotIndex) : '';

  let index = 2;
  let candidate = `${base}-${index}${extension}`;
  while (taken.has(candidate)) {
    index++;
    candidate = `${base}-${index}${extension}`;
  }
  return candidate;
}
