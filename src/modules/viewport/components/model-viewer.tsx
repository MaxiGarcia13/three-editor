import { useActiveModel } from '../hooks/use-active-model';

export function ModelViewer() {
  const { scene } = useActiveModel();

  if (!scene) {
    return null;
  }

  return <primitive object={scene} />;
}
