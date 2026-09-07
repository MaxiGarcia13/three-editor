import type * as THREE from 'three';

function disposeMaterialTextures(material: THREE.Material): void {
  for (const value of Object.values(material)) {
    if ((value as THREE.Texture).isTexture) {
      (value as THREE.Texture).dispose();
    }
  }
}

export function disposeScene(scene: THREE.Object3D): void {
  scene.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (mesh.geometry) {
      mesh.geometry.dispose();
    }

    const material = mesh.material;
    if (!material) {
      return;
    }

    const materials = Array.isArray(material) ? material : [material];
    for (const mat of materials) {
      disposeMaterialTextures(mat);
      mat.dispose();
    }
  });
}
