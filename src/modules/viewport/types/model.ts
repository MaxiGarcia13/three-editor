import type * as THREE from 'three';

export type ModelLoadPhase = 'idle' | 'loading' | 'loaded' | 'error';

export interface ModelState {
  phase: ModelLoadPhase;
  scene: THREE.Group | null;
  blobUrl: string | null;
  fileName: string | null;
  error: string | null;
}

export interface ModelLoadResult {
  scene: THREE.Group;
  blobUrl: string;
}
