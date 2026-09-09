import type { Object3D } from 'three';

import type { SelectionState } from '../types/selection';
import { map } from 'nanostores';
import { resumeMixerBindings } from '@/modules/animation/services/mixer-session';
import { restorePose } from '@/modules/animation/stores/clip-store/handlers/restore-pose';
import { $poseDirty, clearPoseDirty } from './pose-edit-store';

export const $selection = map<SelectionState>({ object: null });

function discardUnsavedPoseEdit(): void {
  if ($poseDirty.get()) {
    restorePose();
    return;
  }
  resumeMixerBindings();
  clearPoseDirty();
}

export function selectObject(object: Object3D | null): void {
  if (object === $selection.get().object) {
    return;
  }
  discardUnsavedPoseEdit();
  $selection.setKey('object', object);
}

export function clearSelection(): void {
  if ($selection.get().object === null && !$poseDirty.get()) {
    return;
  }
  discardUnsavedPoseEdit();
  $selection.setKey('object', null);
}
