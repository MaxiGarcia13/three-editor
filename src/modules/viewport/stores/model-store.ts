import type { ModelEntry, ModelLibraryPhase, ModelLibraryState } from '../types/model';

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

export async function importModelFiles(files: File[]): Promise<void> {
  if (files.length === 0) {
    return;
  }

  $model.setKey('phase', 'loading');
  $model.setKey('error', null);

  const loadedEntries: ModelEntry[] = [];
  const failures: string[] = [];

  for (const file of files) {
    try {
      const result = await loadModelFromFile(file);
      loadedEntries.push({
        id: createEntryId(),
        fileName: file.name,
        blobUrl: result.blobUrl,
        scene: result.scene,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load model';
      failures.push(`${file.name}: ${message}`);
    }
  }

  const current = $model.get();
  const failureText = failures.length > 0 ? failures.join('\n') : null;

  if (loadedEntries.length === 0) {
    const phase = current.models.length > 0 ? 'loaded' : 'error';
    $model.set({
      ...current,
      phase,
      error: failureText,
    });
    return;
  }

  $model.set({
    models: [...current.models, ...loadedEntries],
    activeModelId: current.activeModelId ?? loadedEntries[0].id,
    phase: 'loaded',
    error: failureText,
  });
}

export function loadModel(file: File): Promise<void> {
  return importModelFiles([file]);
}

export function setActiveModel(id: string): void {
  $model.setKey('activeModelId', id);
}

function disposeEntry(entry: ModelEntry): void {
  URL.revokeObjectURL(entry.blobUrl);
  disposeScene(entry.scene);
}

export function removeModel(id: string): void {
  const state = $model.get();
  const index = state.models.findIndex((model) => model.id === id);
  if (index < 0) {
    return;
  }

  const removed = state.models[index];
  const wasActive = state.activeModelId === id;
  disposeEntry(removed);

  const models = state.models.filter((model) => model.id !== id);
  const activeModelId = wasActive ? (models[0]?.id ?? null) : state.activeModelId;
  const phase: ModelLibraryPhase = models.length > 0 ? 'loaded' : 'idle';

  $model.set({
    models,
    activeModelId,
    phase,
    error: null,
  });
}

export async function replaceModel(id: string, file: File): Promise<void> {
  const initialIndex = $model.get().models.findIndex((model) => model.id === id);
  if (initialIndex < 0) {
    return;
  }

  try {
    const result = await loadModelFromFile(file);
    const state = $model.get();
    const currentIndex = state.models.findIndex((model) => model.id === id);
    if (currentIndex < 0) {
      URL.revokeObjectURL(result.blobUrl);
      disposeScene(result.scene);
      return;
    }

    const previous = state.models[currentIndex];
    disposeEntry(previous);

    const models = [...state.models];
    models[currentIndex] = {
      ...previous,
      fileName: file.name,
      blobUrl: result.blobUrl,
      scene: result.scene,
    };

    $model.set({
      ...state,
      models,
      phase: 'loaded',
      error: null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to replace model';
    $model.setKey('error', message);
  }
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
