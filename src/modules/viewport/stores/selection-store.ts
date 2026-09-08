import type { Object3D } from 'three';

import type { SelectionState } from '../types/selection';
import { map } from 'nanostores';
import { clearPoseDirty } from './pose-edit-store';

export const $selection = map<SelectionState>({ object: null });

export function selectObject(object: Object3D | null): void {
  clearPoseDirty();
  $selection.setKey('object', object);
}

export function clearSelection(): void {
  clearPoseDirty();
  $selection.setKey('object', null);
}
