import type { ClipEntry } from '@/modules/animation/types/clip';
import { rebaseClipWithOverrides } from '@/modules/animation/domain/bind-pose-rebase';
import { getBindPoseOverrides } from '@/modules/animation/stores/bind-pose-store';
import { $activeModel } from '@/modules/viewport/stores/model-store';

/** Clone and rebase clip tracks with the active model's accumulated bind-pose deltas. */
export function applyActiveModelBindOverrides(entry: ClipEntry): ClipEntry {
  const model = $activeModel.get();
  if (!model || !entry.clip) {
    return entry;
  }
  const overrides = getBindPoseOverrides(model.id);
  if (Object.keys(overrides).length === 0) {
    return entry;
  }

  const clip = entry.clip.clone();
  rebaseClipWithOverrides(clip, overrides);
  const sourceClip
    = entry.sourceClip && entry.sourceClip !== entry.clip
      ? rebaseClipWithOverrides(entry.sourceClip.clone(), overrides)
      : clip;
  return { ...entry, clip, sourceClip };
}
