import type { ClipEntry } from '@/modules/animation/types/clip';
import {
  buildSkeletonNodeSet,
  validateClipAgainstSkeleton,
} from '@/modules/animation/domain/clip-validate';
import { $model } from '@/modules/viewport/stores/model-store';
import { $clips } from '../store';
import { nextClipId } from '../utils';
import { selectClip } from './select-clip';

/**
 * Clone an existing clip as an owned copy under a model.
 * The source clip stays unchanged; the clone gets a new id and ownerModelId.
 * Validates against the owner model's skeleton so bone mismatches surface as
 * `error` (Needs retarget) — same as import / shared sync.
 */
export function cloneClipAs(sourceId: string, ownerModelId: string): string | null {
  const state = $clips.get();
  const source = state.clips.find((entry) => entry.id === sourceId);
  if (!source?.clip) {
    return null;
  }

  const ownerScene = $model.get().models.find((model) => model.id === ownerModelId)?.scene;
  if (!ownerScene) {
    return null;
  }

  const clip = source.clip.clone();
  const validation = validateClipAgainstSkeleton(
    clip,
    buildSkeletonNodeSet(ownerScene),
  );

  const newId = nextClipId();
  const clone: ClipEntry = {
    ...source,
    id: `${newId}-${source.name}`,
    clip,
    sourceClip: source.sourceClip?.clone() ?? source.clip.clone(),
    ownerModelId,
    status: validation.valid
      ? (source.status === 'draft' ? 'draft' : 'ready')
      : 'error',
    error: validation.valid ? null : validation.error,
  };

  $clips.set({
    ...state,
    clips: [...state.clips, clone],
  });

  if (validation.valid) {
    selectClip(clone.id);
  }

  return clone.id;
}
