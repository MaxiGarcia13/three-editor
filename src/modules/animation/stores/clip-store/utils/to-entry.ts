import type { ClipValidationResult } from '@/modules/animation/services/clip-validate';
import type { ClipEntry } from '@/modules/animation/types/clip';
import { AnimationClip } from 'three';

export function toEntry(
  validationResult: ClipValidationResult,
  baseId: string,
  clip: AnimationClip,
  sourceFile: string,
): ClipEntry {
  return {
    id: `${baseId}-${clip.name}`,
    name: clip.name,
    sourceFile,
    clip,
    sourceClip: clip,
    status: validationResult.valid ? 'ready' : 'error',
    error: validationResult.valid ? null : validationResult.error,
  };
}

export function toFailedFileEntry(baseId: string, fileName: string, error: unknown): ClipEntry {
  const message = error instanceof Error ? error.message : 'Failed to import clip';
  return {
    id: `${baseId}-file`,
    name: fileName,
    sourceFile: fileName,
    clip: null,
    sourceClip: null,
    status: 'error',
    error: message,
  };
}

/**
 * Editable new animation from scratch.
 * Starts with a default duration so trim/keyframe edits are immediately possible.
 */
export function toNewAnimationEntry(baseId: string, name: string): ClipEntry {
  const sourceClip = new AnimationClip(name, 1, []);
  const clip = sourceClip.clone();
  return {
    id: `${baseId}-new`,
    name,
    sourceFile: 'New animation',
    clip,
    sourceClip,
    status: 'draft',
    error: null,
  };
}
