import JSZip from 'jszip';

import { uniqueFileName } from '../utils/file-name';

export interface ZipEntry {
  fileName: string;
  data: ArrayBuffer;
}

export async function buildZipArchive(entries: ZipEntry[]): Promise<Blob> {
  const zip = new JSZip();
  const taken = new Set<string>();

  for (const entry of entries) {
    const fileName = uniqueFileName(entry.fileName, taken);
    zip.file(fileName, entry.data);
    taken.add(fileName);
  }

  return zip.generateAsync({ type: 'blob' });
}
