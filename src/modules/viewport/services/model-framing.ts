import type { Object3D, PerspectiveCamera } from 'three';
import { Box3, Vector3 } from 'three';
import { DEFAULT_VIEW_OFFSET } from '../constants/camera';

export interface ModelFraming {
  center: Vector3;
  /** World-space camera position (center + default three-quarter offset). */
  position: Vector3;
  distance: number;
  minDistance: number;
  maxDistance: number;
}

const SPACING = 2.4;

export function computeModelFraming(
  scene: Object3D,
  camera: PerspectiveCamera,
): ModelFraming {
  const box = new Box3().setFromObject(scene);
  const size = box.getSize(new Vector3());
  const center = box.getCenter(new Vector3());
  const maxDimension = Math.max(size.x, size.y, size.z) || 1;

  const tanFov = Math.tan((camera.fov * Math.PI) / 180 / 2);
  const fitHeight = maxDimension / (2 * tanFov);
  const fitWidth = fitHeight / camera.aspect;
  const distance = Math.max(fitHeight, fitWidth) * SPACING;
  const position = center
    .clone()
    .addScaledVector(DEFAULT_VIEW_OFFSET, distance);

  return {
    center,
    position,
    distance,
    minDistance: maxDimension * 0.05,
    maxDistance: maxDimension * 10,
  };
}
