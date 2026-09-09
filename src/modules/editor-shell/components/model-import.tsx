import { useStore } from '@nanostores/react';
import { Button } from '@/components/button';
import { useGltfFilePicker } from '@/components/gltf-file-picker/use-gltf-file-picker';
import { UploadIcon } from '@/components/icons/upload-icon';
import { $model, importModelFiles } from '@/modules/viewport/stores/model-store';

export function ModelImport() {
  const { phase } = useStore($model, { keys: ['phase'] });
  const isLoading = phase === 'loading';

  const { open, fileInput } = useGltfFilePicker({
    multiple: true,
    onFiles: (files) => {
      void importModelFiles(files);
    },
  });

  return (
    <>
      {fileInput}
      <Button
        onClick={() => open()}
        disabled={isLoading}
        variant="ghost"
        aria-label="Load models"
        title="Load models"
        className="p-1.5"
      >
        <UploadIcon />
      </Button>
    </>
  );
}
