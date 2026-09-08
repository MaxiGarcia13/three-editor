import type { OrbitControlsRef } from './model-framing';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { ClipMixerDriver } from '@/modules/animation/components/clip-mixer-driver';
import {
  DEFAULT_CAMERA_FOV,
  DEFAULT_CAMERA_POSITION,
  DEFAULT_CAMERA_TARGET,
} from '../constants/camera';
import { GroundGrid } from './ground-grid';
import { ModelFraming } from './model-framing';
import { ModelViewer } from './model-viewer';
import { SelectionDriver } from './selection-driver';
import { SelectionHighlight } from './selection-highlight';
import { TransformControlsDriver } from './transform-controls-driver';
import { WorldAxes } from './world-axes';

export function ViewportCanvas() {
  const controlsRef = useRef<OrbitControlsRef>(null);

  return (
    <Canvas
      camera={{
        position: [...DEFAULT_CAMERA_POSITION],
        fov: DEFAULT_CAMERA_FOV,
      }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <GroundGrid />
      <WorldAxes />
      <OrbitControls
        enableDamping
        ref={controlsRef}
        target={[...DEFAULT_CAMERA_TARGET]}
      />
      <ModelViewer />
      <ClipMixerDriver />
      <ModelFraming controlsRef={controlsRef} />
      <SelectionDriver />
      <SelectionHighlight />
      <TransformControlsDriver controlsRef={controlsRef} />
    </Canvas>
  );
}
