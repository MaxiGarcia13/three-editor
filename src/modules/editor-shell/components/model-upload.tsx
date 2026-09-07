import { useStore } from '@nanostores/react';
import { useRef } from 'react';
import { AssetEntry } from '@/components/asset-entry/asset-entry';
import { Button } from '@/components/button/button';
import { UploadIcon } from '@/components/icons/upload-icon';
import { GLTF_FILE_ACCEPT } from '@/modules/viewport/constants/gltf-file';
import { $model, loadModel, resetModel } from '@/modules/viewport/stores/model-store';

export function ModelUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { phase, fileName, error } = useStore($model);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      loadModel(file);
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

      {phase === 'loaded' && fileName && (
        <AssetEntry
          label={fileName}
          onReplace={handleClick}
          onRemove={handleReset}
        />
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
