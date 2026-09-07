import type { ModelEntry, ModelLibraryState } from '../types/model';

import { computed, map } from 'nanostores';
import { loadModelFromFile } from '../adapters/model-loader';
import { disposeScene } from '../services/scene-dispose';

export const $model = map<ModelLibraryState>({
  models: [],
  activeModelId: null,
  phase: 'idle',
  error: null,
});

export const $activeModel = computed($model, (state) => {
  const { models, activeModelId } = state;
  return models.find((model) => model.id === activeModelId) ?? null;
});

let nextModelId = 1;

function createEntryId(): string {
  return `model-${nextModelId++}`;
}

export async function loadModel(file: File): Promise<void> {
  $model.setKey('phase', 'loading');
  $model.setKey('error', null);

  try {
    const result = await loadModelFromFile(file);

    const entry: ModelEntry = {
      id: createEntryId(),
      fileName: file.name,
      blobUrl: result.blobUrl,
      scene: result.scene,
    };

    const current = $model.get();
    $model.set({
      models: [...current.models, entry],
      activeModelId: current.activeModelId ?? entry.id,
      phase: 'loaded',
      error: null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load model';

    $model.setKey('phase', 'error');
    $model.setKey('error', message);
  }
}

export function setActiveModel(id: string): void {
  $model.setKey('activeModelId', id);
}

export function resetModel(): void {
  const current = $model.get();

  for (const model of current.models) {
    URL.revokeObjectURL(model.blobUrl);
    disposeScene(model.scene);
  }

  $model.set({
    models: [],
    activeModelId: null,
    phase: 'idle',
    error: null,
  });
}
