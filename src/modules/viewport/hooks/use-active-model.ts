import type { Group } from 'three';

import { useStore } from '@nanostores/react';

import type { ModelEntry } from '../types/model';
import { $activeModel } from '../stores/model-store';

export function useActiveModel(): {
  activeModel: ModelEntry | null;
  scene: Group | null;
} {
  const activeModel = useStore($activeModel);
  return {
    activeModel,
    scene: activeModel?.scene ?? null,
  };
}
