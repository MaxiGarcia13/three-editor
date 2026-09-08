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
    <div className="flex flex-col gap-2">
      {fileInput}
      <Button
        onClick={() => open()}
        disabled={!enabled}
        className="flex items-center gap-2 w-full justify-center"
      >
        <UploadIcon />
        <span className="text-xs">Import Animations</span>
      </Button>
      {!enabled && (
        <p className="text-xs text-zinc-500">
          Load a model before importing animations.
        </p>
      )}
    </div>
  );
}
