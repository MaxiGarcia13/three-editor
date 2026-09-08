import type * as THREE from 'three';

import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

export async function exportGlbBinary(
  scene: THREE.Object3D,
  animations: THREE.AnimationClip[],
): Promise<ArrayBuffer> {
  const exporter = new GLTFExporter();
  const data = await exporter.parseAsync(scene, { binary: true, animations });

  if (!(data instanceof ArrayBuffer)) {
    throw new TypeError('GLTFExporter did not return a binary buffer');
  }

  return data;
}
