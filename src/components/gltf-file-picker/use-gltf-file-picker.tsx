import type { ChangeEvent, ReactElement } from 'react';
import { useRef } from 'react';

import { GLTF_FILE_ACCEPT } from '@/utils/glb-parse';

interface UseGltfFilePickerOptions<TContext> {
  multiple?: boolean;
  onFiles: (files: File[], context: TContext | undefined) => void;
}

interface UseGltfFilePickerResult<TContext> {
  open: (context?: TContext) => void;
  fileInput: ReactElement;
}

/** Hidden GLB/GLTF file input + open() helper; optional context for replace flows. */
export function useGltfFilePicker<TContext = void>({
  multiple = false,
  onFiles,
}: UseGltfFilePickerOptions<TContext>): UseGltfFilePickerResult<TContext> {
  const inputRef = useRef<HTMLInputElement>(null);
  const contextRef = useRef<TContext | undefined>(undefined);

  const open = (context?: TContext) => {
    contextRef.current = context;
    inputRef.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const context = contextRef.current;
    contextRef.current = undefined;

    if (files && files.length > 0) {
      onFiles(Array.from(files), context);
    }

    event.target.value = '';
  };

  const fileInput = (
    <input
      ref={inputRef}
      type="file"
      accept={GLTF_FILE_ACCEPT}
      multiple={multiple || undefined}
      onChange={handleChange}
      className="hidden"
    />
  );

  return { open, fileInput };
}
