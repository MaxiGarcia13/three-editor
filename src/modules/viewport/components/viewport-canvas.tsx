import type { OrbitControlsRef } from './model-framing';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { useRef } from 'react';
import { ClipMixerDriver } from '@/modules/animation/components/clip-mixer-driver';
import { ModelFraming } from './model-framing';
import { ModelViewer } from './model-viewer';
import { WorldAxes } from './world-axes';

export function ViewportCanvas() {
  const controlsRef = useRef<OrbitControlsRef>(null);

  return (
    <Canvas
      camera={{ position: [0, 1, 3], fov: 50 }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <WorldAxes />
      <OrbitControls enableDamping ref={controlsRef} />
      <ModelViewer />
      <ClipMixerDriver />
      <ModelFraming controlsRef={controlsRef} />
    </Canvas>
  );
}
