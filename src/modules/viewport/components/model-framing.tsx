import type { OrbitControls } from '@react-three/drei';
import type { ComponentRef } from 'react';
import type { PerspectiveCamera } from 'three';
import { useStore } from '@nanostores/react';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { $model } from '@/modules/viewport/stores/model-store';
import { computeModelFraming } from '../services/model-framing';

export type OrbitControlsRef = ComponentRef<typeof OrbitControls>;

export interface ModelFramingProps {
  controlsRef: React.RefObject<OrbitControlsRef | null>;
}

export function ModelFraming({ controlsRef }: ModelFramingProps) {
  const { scene } = useStore($model, { keys: ['scene'] });
  const camera = useThree((state) => state.camera);
  const perspectiveCamera = camera as PerspectiveCamera;

  useEffect(() => {
    if (!scene) {
      return;
    }

    const framing = computeModelFraming(scene, perspectiveCamera);

    perspectiveCamera.position.copy(framing.position);
    perspectiveCamera.near = framing.distance / 100;
    perspectiveCamera.far = framing.distance * 100;
    perspectiveCamera.updateProjectionMatrix();

    const controls = controlsRef.current;
    if (controls) {
      controls.target.copy(framing.center);
      controls.minDistance = framing.minDistance;
      controls.maxDistance = framing.maxDistance;
      controls.update();
    }
  }, [scene, perspectiveCamera, controlsRef]);

  return null;
}
