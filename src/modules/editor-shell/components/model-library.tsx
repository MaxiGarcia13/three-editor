import { useStore } from '@nanostores/react';
import { useRef } from 'react';
import { AssetEntry } from '@/components/asset-entry/asset-entry';
import { Button } from '@/components/button/button';
import { UploadIcon } from '@/components/icons/upload-icon';
import { GLTF_FILE_ACCEPT } from '@/modules/viewport/constants/gltf-file';
import {
  $model,
  importModelFiles,
  removeModel,
  replaceModel,
  setActiveModel,
} from '@/modules/viewport/stores/model-store';

export function ModelLibrary() {
  const importInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const replaceTargetIdRef = useRef<string | null>(null);

  const { models, activeModelId, phase, error } = useStore($model);

  const handleImportClick = () => {
    importInputRef.current?.click();
  };

  const handleImportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      void importModelFiles(Array.from(files));
    }
    event.target.value = '';
  };

  const handleReplaceClick = (id: string) => {
    replaceTargetIdRef.current = id;
    replaceInputRef.current?.click();
  };

  const handleReplaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const id = replaceTargetIdRef.current;
    if (file && id) {
      void replaceModel(id, file);
    }
    replaceTargetIdRef.current = null;
    event.target.value = '';
  };

  const isLoading = phase === 'loading';

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={importInputRef}
        type="file"
        accept={GLTF_FILE_ACCEPT}
        multiple
        onChange={handleImportChange}
        className="hidden"
      />
      <input
        ref={replaceInputRef}
        type="file"
        accept={GLTF_FILE_ACCEPT}
        onChange={handleReplaceChange}
        className="hidden"
      />

      <Button
        onClick={handleImportClick}
        disabled={isLoading}
        className="flex items-center gap-2 w-full justify-center"
      >
        <UploadIcon />
        <span className="text-xs">Load Models</span>
      </Button>

      {isLoading && (
        <div className="text-xs text-zinc-400 text-center py-2">Loading…</div>
      )}

      {error && (
        <div className="text-[10px] text-red-400/80 whitespace-pre-line">{error}</div>
      )}

      {models.length > 0 && (
        <div className="flex flex-col gap-3">
          {models.map((entry) => (
            <AssetEntry
              key={entry.id}
              label={entry.fileName}
              title={entry.fileName}
              selected={entry.id === activeModelId}
              onSelect={() => setActiveModel(entry.id)}
              onReplace={() => handleReplaceClick(entry.id)}
              onRemove={() => removeModel(entry.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
