import { useStore } from '@nanostores/react';
import { AssetEntry } from '@/components/asset-entry/asset-entry';
import { Button } from '@/components/button';
import { useGltfFilePicker } from '@/components/gltf-file-picker/use-gltf-file-picker';
import { UploadIcon } from '@/components/icons/upload-icon';
import { Text } from '@/components/text';
import {
  $model,
  importModelFiles,
  removeModel,
  replaceModel,
  setActiveModel,
} from '@/modules/viewport/stores/model-store';

export function ModelLibrary() {
  const { models, activeModelId, phase, error } = useStore($model);

  const { open: openImport, fileInput: importInput } = useGltfFilePicker({
    multiple: true,
    onFiles: (files) => {
      void importModelFiles(files);
    },
  });

  const { open: openReplace, fileInput: replaceInput } = useGltfFilePicker<string>({
    onFiles: (files, id) => {
      const file = files[0];
      if (file && id) {
        void replaceModel(id, file);
      }
    },
  });

  const isLoading = phase === 'loading';

  return (
    <div className="flex flex-col gap-3">
      {importInput}
      {replaceInput}

      <Button
        onClick={() => openImport()}
        disabled={isLoading}
        className="flex items-center gap-2 w-full justify-center"
      >
        <UploadIcon />
        Load Models
      </Button>

      {isLoading && (
        <Text as="div" variant="muted" className="text-center py-2">
          Loading…
        </Text>
      )}

      {error && (
        <Text as="div" variant="error" className="whitespace-pre-line">
          {error}
        </Text>
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
              onReplace={() => openReplace(entry.id)}
              onRemove={() => removeModel(entry.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
