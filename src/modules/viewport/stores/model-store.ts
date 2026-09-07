import type { ModelState } from '../types/model';

import { map } from 'nanostores';
import { loadModelFromFile } from '../adapters/model-loader';

export const $model = map<ModelState>({
  phase: 'idle',
  scene: null,
  blobUrl: null,
  fileName: null,
  error: null,
});

export async function loadModel(file: File): Promise<void> {
  $model.set({
    phase: 'loading',
    scene: null,
    blobUrl: null,
    fileName: file.name,
    error: null,
  });

  try {
    const result = await loadModelFromFile(file);

    const previous = $model.get().blobUrl;
    if (previous) {
      URL.revokeObjectURL(previous);
    }

    $model.set({
      phase: 'loaded',
      scene: result.scene,
      blobUrl: result.blobUrl,
      fileName: file.name,
      error: null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load model';

    $model.setKey('phase', 'error');
    $model.setKey('error', message);
  }
}

export function resetModel(): void {
  const previous = $model.get().blobUrl;
  if (previous) {
    URL.revokeObjectURL(previous);
  }

  $model.set({
    phase: 'idle',
    scene: null,
    blobUrl: null,
    fileName: null,
    error: null,
  });
}
