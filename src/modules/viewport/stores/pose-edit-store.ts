import { atom } from 'nanostores';

/** True when TransformControls has edited the selection since last save / seek / reselect. */
export const $poseDirty = atom(false);

export function markPoseDirty(): void {
  if (!$poseDirty.get()) {
    $poseDirty.set(true);
  }
}

export function clearPoseDirty(): void {
  if ($poseDirty.get()) {
    $poseDirty.set(false);
  }
}
