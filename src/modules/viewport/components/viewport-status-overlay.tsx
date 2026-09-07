import { useStore } from '@nanostores/react';

import { UploadIcon } from '@/components/icons/upload-icon';
import { $model } from '@/modules/viewport/stores/model-store';

export function ViewportStatusOverlay() {
  const { phase, error } = useStore($model, { keys: ['phase', 'error'] });

  if (phase === 'loaded') {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
      {phase === 'idle' && (
        <div className="flex flex-col items-center gap-2 text-center text-sm text-zinc-500">
          <UploadIcon className="h-6 w-6" />
          <span>Load a .glb or .gltf to get started</span>
        </div>
      )}
      {phase === 'loading' && (
        <span className="text-sm text-zinc-400">Loading model…</span>
      )}
      {phase === 'error' && error && (
        <span className="max-w-md text-center text-sm text-red-400">{error}</span>
      )}
    </div>
  );
}
