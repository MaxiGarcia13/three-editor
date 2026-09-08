import { atom } from 'nanostores';

export type TransformMode = 'translate' | 'rotate' | 'scale';

export const $transformMode = atom<TransformMode>('translate');

export function setTransformMode(mode: TransformMode): void {
  if ($transformMode.get() !== mode) {
    $transformMode.set(mode);
  }
}
