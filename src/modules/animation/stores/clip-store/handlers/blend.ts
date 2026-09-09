import { $clips } from '../store';
import { isReadyClip } from '../utils';

export const MIN_BLEND_WEIGHT = 0;
export const MAX_BLEND_WEIGHT = 1;

/** Select the secondary clip for the blend overlay; null clears it. */
export function setBlendClip(id: string | null): void {
  if (id) {
    const target = $clips.get().clips.find((entry) => entry.id === id);
    if (!isReadyClip(target)) {
      return;
    }
  }
  $clips.set({
    ...$clips.get(),
    blendClipId: id,
    blendWeight: id ? $clips.get().blendWeight : 0,
  });
}

export function setBlendWeight(weight: number): void {
  const clamped = Math.min(Math.max(weight, MIN_BLEND_WEIGHT), MAX_BLEND_WEIGHT);
  $clips.setKey('blendWeight', clamped);
}
