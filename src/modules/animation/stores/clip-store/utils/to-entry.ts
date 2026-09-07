import type { AnimationClip } from 'three';

import type { ClipValidationResult } from '@/modules/animation/services/clip-validate';
import type { ClipEntry } from '@/modules/animation/types/clip';

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
    status: 'error',
    error: message,
  };
}
