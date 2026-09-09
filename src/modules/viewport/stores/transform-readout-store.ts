import { atom } from 'nanostores';
import { suspendMixerBindings } from '@/modules/animation/services/mixer-session';
import { pause } from '@/modules/animation/stores/clip-store/handlers/playback';
import { restorePose } from '@/modules/animation/stores/clip-store/handlers/restore-pose';
import { $activeModel } from './model-store';
import {
  $poseDirty,
  $poseEditKind,
  capturePreEditTransform,
  markPoseDirty,
} from './pose-edit-store';

export type TransformAxis = 'x' | 'y' | 'z';

export interface TransformReadout {
  x: number;
  y: number;
  z: number;
}

/** Live model-root X / Y / Z readout fed by the viewport's per-frame driver. */
export const $transformReadout = atom<TransformReadout | null>(null);

/**
 * Apply one model-root axis from Settings — independent of Edit / Move tool.
 * Same dirty / snapshot path as Move-mode TransformControls.
 */
export function applyTransformPositionAxis(axis: TransformAxis, value: number): void {
  if (!Number.isFinite(value)) {
    return;
  }

  const object = $activeModel.get()?.scene ?? null;
  if (!object) {
    return;
  }

  if (object.position[axis] === value) {
    return;
  }

  // Settings always edits the root; discard a pending bone/mesh edit first.
  if ($poseDirty.get() && $poseEditKind.get() === 'selection') {
    restorePose();
  }

  if (!$poseDirty.get()) {
    capturePreEditTransform(object, 'modelRoot');
  }

  pause();
  suspendMixerBindings();
  object.position[axis] = value;
  object.updateMatrixWorld(true);
  markPoseDirty();

  const { x, y, z } = object.position;
  $transformReadout.set({ x, y, z });
}
