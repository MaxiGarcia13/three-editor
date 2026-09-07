import type * as THREE from 'three';
import { useStore } from '@nanostores/react';
import { useEffect, useRef } from 'react';

import { $model } from '@/modules/viewport/stores/model-store';
import { disposeScene } from '../services/scene-dispose';

export function ModelViewer() {
  const { scene } = useStore($model, { keys: ['scene'] });
  const previousSceneRef = useRef<THREE.Group | null>(null);

  // Dispose the scene we were rendering only after the swap commits, so a
  // rendered frame never references freed buffers.
  useEffect(() => {
    if (previousSceneRef.current && previousSceneRef.current !== scene) {
      disposeScene(previousSceneRef.current);
    }
    previousSceneRef.current = scene;
  }, [scene]);

  if (!scene) {
    return null;
  }

  return <primitive object={scene} />;
}
