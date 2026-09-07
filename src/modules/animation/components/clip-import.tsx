import { useStore } from '@nanostores/react';
import { useRef } from 'react';

import { Button } from '@/components/button/button';
import { UploadIcon } from '@/components/icons/upload-icon';
import { GLTF_FILE_ACCEPT } from '@/modules/viewport/constants/gltf-file';
import { $model } from '@/modules/viewport/stores/model-store';
import { importClipFiles } from '../stores/clip-store';

export function ClipImport() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { scene } = useStore($model, { keys: ['scene'] });
  const enabled = scene !== null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      void importClipFiles(Array.from(files), scene);
    }
    event.target.value = '';
  };

  const handleClick = () => {
    inputRef.current?.click();
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
      <Button
        onClick={handleClick}
        disabled={!enabled}
        className="flex items-center gap-2 w-full justify-center"
      >
        <UploadIcon />
        <span className="text-xs">Import Animations</span>
      </Button>
      {!enabled && (
        <p className="text-[10px] text-zinc-500">
          Load a model before importing animations.
        </p>
      )}
    </div>
  );
}
