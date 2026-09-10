import type { ZipEntry } from '../adapters/zip';
import { Group } from 'three';
import { $clips } from '@/modules/animation/stores/clip-store';
import { $activeModel, $model } from '@/modules/viewport/stores/model-store';
import { downloadBlob } from '../adapters/download';
import { buildZipArchive } from '../adapters/zip';
import { packClipGlb } from './clip-glb';
import { packModelGlb } from './model-glb';

export const EXPORT_ZIP_FILE_NAME = 'glb-export.zip';

export async function downloadExportZip(): Promise<void> {
  const modelState = $model.get();
  const clipState = $clips.get();

  const models = modelState.models;
  const workingClips = clipState.clips.filter((entry) => entry.clip !== null);

  if (models.length === 0 && workingClips.length === 0) {
    throw new Error('Nothing to pack');
  }

  const skeletonScene = $activeModel.get()?.scene ?? new Group();
  const entries: ZipEntry[] = [];

  for (const model of models) {
    entries.push(await packModelGlb(model, clipState.clips));
  }

  for (const entry of workingClips) {
    entries.push(await packClipGlb(entry, skeletonScene));
  }

  const blob = await buildZipArchive(entries);
  downloadBlob(blob, EXPORT_ZIP_FILE_NAME);
}
