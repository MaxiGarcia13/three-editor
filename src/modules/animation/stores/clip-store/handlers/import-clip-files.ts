import type { Object3D } from 'three';

import type { ClipEntry } from '@/modules/animation/types/clip';

import { loadClipsFromFile } from '@/modules/animation/adapters/clip-loader';
import { buildSkeletonNodeSet, validateClipAgainstSkeleton } from '@/modules/animation/services/clip-validate';
import { $clips } from '../store';
import { toEntry, toFailedFileEntry } from '../utils';
import { selectClip } from './select-clip';

let clipIdCounter = 0;

export async function importClipFiles(files: File[], skeleton: Object3D | null): Promise<void> {
  if (!skeleton) {
    return;
  }
  const nodeNames = buildSkeletonNodeSet(skeleton);

  const entries: ClipEntry[] = [];

  for (const file of files) {
    const baseId = `clip-${clipIdCounter++}`;
    try {
      const result = await loadClipsFromFile(file);
      for (const clip of result.clips) {
        const validation = validateClipAgainstSkeleton(clip, nodeNames);
        entries.push(toEntry(validation, baseId, clip, result.name));
      }
    } catch (error) {
      entries.push(toFailedFileEntry(baseId, file.name, error));
    }
  }

  if (entries.length === 0) {
    return;
  }

  $clips.setKey('clips', [...$clips.get().clips, ...entries]);

  const state = $clips.get();
  if (!state.activeClipId) {
    const firstReady = entries.find((entry) => entry.status === 'ready');
    if (firstReady) {
      selectClip(firstReady.id);
    }
  }
}
