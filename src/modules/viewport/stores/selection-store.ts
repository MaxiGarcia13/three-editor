import type { Object3D } from 'three';

import type { SelectionState } from '../types/selection';
import { map } from 'nanostores';

export const $selection = map<SelectionState>({ object: null });

export function selectObject(object: Object3D | null): void {
  $selection.setKey('object', object);
}

export function clearSelection(): void {
  $selection.setKey('object', null);
}
