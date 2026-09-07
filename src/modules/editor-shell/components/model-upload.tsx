import { useStore } from '@nanostores/react';
import { useRef } from 'react';
import { AssetEntry } from '@/components/asset-entry/asset-entry';
import { Button } from '@/components/button/button';
import { UploadIcon } from '@/components/icons/upload-icon';
import { GLTF_FILE_ACCEPT } from '@/modules/viewport/constants/gltf-file';
import { useActiveModel } from '@/modules/viewport/hooks/use-active-model';
import {
  $model,
  importModelFiles,
  resetModel,
} from '@/modules/viewport/stores/model-store';

export function ModelUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { phase, error } = useStore($model, { keys: ['phase', 'error'] });
  const { activeModel } = useActiveModel();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      void importModelFiles(Array.from(files));
    }
    event.target.value = '';
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleReset = () => {
    resetModel();
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept={GLTF_FILE_ACCEPT}
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {phase === 'idle' && (
        <Button onClick={handleClick} className="flex items-center gap-2 w-full justify-center">
          <UploadIcon />
          <span className="text-xs">Load Model</span>
        </Button>
      )}

      {phase === 'loading' && (
        <div className="text-xs text-zinc-400 text-center py-2">
          Loading…
        </div>
      )}

      {phase === 'loaded' && activeModel && (
        <AssetEntry
          label={activeModel.fileName}
          onReplace={handleClick}
          onRemove={handleReset}
        />
      )}

      {phase === 'loaded' && error && (
        <div className="text-[10px] text-red-400/80 whitespace-pre-line">
          {error}
        </div>
      )}

      {phase === 'error' && (
        <div className="flex flex-col gap-2">
          <div className="text-xs text-red-400">
            {error}
          </div>
          <Button onClick={handleClick} variant="ghost" className="text-xs">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
