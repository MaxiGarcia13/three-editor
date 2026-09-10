import { useStore } from '@nanostores/react';
import { GltfImportButton } from '@/components/gltf-file-picker/gltf-import-button';
import { $model, importModelFiles } from '@/modules/viewport/stores/model-store';

interface ModelImportProps {
  onImport?: () => void;
}

export function ModelImport({ onImport }: ModelImportProps) {
  const { phase } = useStore($model, { keys: ['phase'] });

  return (
    <GltfImportButton
      disabled={phase === 'loading'}
      label="Load models"
      onImport={onImport}
      onFiles={(files) => {
        void importModelFiles(files);
      }}
    />
  );
}
