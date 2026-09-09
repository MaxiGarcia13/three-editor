import { useStore } from '@nanostores/react';
import { AssetEntry } from '@/components/asset-entry/asset-entry';
import { useGltfFilePicker } from '@/components/gltf-file-picker/use-gltf-file-picker';
import { Text } from '@/components/text';
import {
  $model,
  removeModel,
  renameModel,
  replaceModel,
  setActiveModel,
} from '@/modules/viewport/stores/model-store';

export function ModelLibrary() {
  const { models, activeModelId, phase, error } = useStore($model);

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
      {replaceInput}

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
              onRename={(name) => renameModel(entry.id, name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
