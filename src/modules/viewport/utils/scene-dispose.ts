import type { Material, Mesh, Object3D, Texture } from 'three';

function disposeMaterialTextures(material: Material): void {
  for (const value of Object.values(material)) {
    if (value && (value as Texture).isTexture) {
      (value as Texture).dispose();
    }
  }
}

export function disposeScene(scene: Object3D): void {
  scene.traverse((object) => {
    const mesh = object as Mesh;
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
