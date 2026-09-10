import { Button } from '@/components/button';
import { useGltfFilePicker } from '@/components/gltf-file-picker/use-gltf-file-picker';
import { UploadIcon } from '@/components/icons/upload-icon';
import { useActiveModel } from '@/modules/viewport/hooks/use-active-model';
import { importClipFiles } from '../stores/clip-store';

export function ClipImport() {
  const { scene } = useActiveModel();
  const enabled = scene !== null;

  const { open, fileInput } = useGltfFilePicker({
    multiple: true,
    onFiles: (files) => {
      void importClipFiles(files, scene);
    },
  });

  return (
    <>
      {fileInput}
      <Button
        onClick={() => open()}
        disabled={!enabled}
        variant="ghost"
        aria-label="Import animations"
        title="Import animations"
        className="p-1.5"
      >
        <UploadIcon />
      </Button>
    </>
  );
}
