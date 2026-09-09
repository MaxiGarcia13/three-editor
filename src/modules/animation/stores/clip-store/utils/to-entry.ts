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

/** Blank authoring target — the only entry later blend/time writes may mutate. */
export function toBlankDraftEntry(baseId: string, name: string): ClipEntry {
  return {
    id: `${baseId}-draft`,
    name,
    sourceFile: 'Blank draft',
    clip: null,
    sourceClip: null,
    status: 'draft',
    error: null,
  };
}
