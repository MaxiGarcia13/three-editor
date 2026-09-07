import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export function ViewportCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 1, 3], fov: 50 }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enableDamping />
    </Canvas>
  );
}
