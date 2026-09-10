import type { BindPoseDelta } from '@/modules/animation/domain/bind-pose-rebase';
import { atom } from 'nanostores';
import { composeBindPoseDeltas } from '@/modules/animation/domain/bind-pose-rebase';

/** Per-model accumulated bind-pose deltas, keyed by node name. */
export type BindPoseOverridesByModel = Record<string, Record<string, BindPoseDelta>>;

export const $bindPoseOverrides = atom<BindPoseOverridesByModel>({});

export function getBindPoseOverrides(modelId: string): Readonly<Record<string, BindPoseDelta>> {
  return $bindPoseOverrides.get()[modelId] ?? {};
}

export function accumulateBindPoseDelta(
  modelId: string,
  nodeName: string,
  delta: BindPoseDelta,
): void {
  const all = $bindPoseOverrides.get();
  const forModel = { ...(all[modelId] ?? {}) };
  const existing = forModel[nodeName];
  forModel[nodeName] = existing ? composeBindPoseDeltas(existing, delta) : delta;
  $bindPoseOverrides.set({ ...all, [modelId]: forModel });
}

export function clearBindPoseOverrides(modelId: string): void {
  const all = $bindPoseOverrides.get();
  if (!(modelId in all)) {
    return;
  }
  const next = { ...all };
  delete next[modelId];
  $bindPoseOverrides.set(next);
}

export function clearAllBindPoseOverrides(): void {
  if (Object.keys($bindPoseOverrides.get()).length === 0) {
    return;
  }
  $bindPoseOverrides.set({});
}
