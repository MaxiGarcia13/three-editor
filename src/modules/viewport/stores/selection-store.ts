import type { Object3D } from 'three';

import type { SelectionState } from '../types/selection';
import { map } from 'nanostores';
import { resumeMixerBindings } from '@/modules/animation/services/mixer-session';
import { clearPoseDirty } from './pose-edit-store';

export const $selection = map<SelectionState>({ object: null });

export function selectObject(object: Object3D | null): void {
  resumeMixerBindings();
  clearPoseDirty();
  $selection.setKey('object', object);
}

export function clearSelection(): void {
  resumeMixerBindings();
  clearPoseDirty();
  $selection.setKey('object', null);
}
