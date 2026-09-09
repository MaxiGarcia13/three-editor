import { GLTF_EXTENSION_PATTERN } from '@/utils/glb-parse';

/** End index for Finder-style selection: basename only when a .glb/.gltf suffix is present. */
export function renameSelectionEnd(name: string): number {
  const match = GLTF_EXTENSION_PATTERN.exec(name);
  if (match?.index != null && match.index > 0) {
    return match.index;
  }
  return name.length;
}
