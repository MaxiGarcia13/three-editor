import { useStore } from '@nanostores/react';
import { useState } from 'react';
import { $clips } from '@/modules/animation/stores/clip-store';
import { $model } from '@/modules/viewport/stores/model-store';
import { downloadExportZip } from '../domain/zip-download';

export function useExportZip() {
  const { models } = useStore($model, { keys: ['models'] });
  const { clips } = useStore($clips, { keys: ['clips'] });

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canExport = models.length > 0 || clips.some((entry) => entry.clip !== null);

  async function download(): Promise<void> {
    setBusy(true);
    setError(null);
    try {
      await downloadExportZip();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Export failed');
    } finally {
      setBusy(false);
    }
  }

  return { download, busy, error, canExport };
}
