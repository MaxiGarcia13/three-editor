import type { ModelEntry } from '@/modules/viewport/types/model';
import { useStore } from '@nanostores/react';
import { Button } from '@/components/button';
import { useGltfFilePicker } from '@/components/gltf-file-picker/use-gltf-file-picker';
import { ModelIcon } from '@/components/icons/model-icon';
import { ReplaceIcon } from '@/components/icons/replace-icon';
import { TrashIcon } from '@/components/icons/trash-icon';
import { ClipRows } from '@/modules/animation/components/clip-rows';
import { $clips } from '@/modules/animation/stores/clip-store';
import { LibrarySectionCollapsible } from '@/modules/editor-shell/components/library-section-collapsible';
import { removeModel, replaceModel } from '@/modules/viewport/stores/model-store';

interface LibraryModelProps {
  model: ModelEntry;
}

export function LibraryModel({ model }: LibraryModelProps) {
  const { clips } = useStore($clips, { keys: ['clips'] });
  const ownedClips = clips.filter((entry) => entry.ownerModelId === model.id);

  const { open: openReplace, fileInput: replaceInput } = useGltfFilePicker({
    onFiles: (files) => {
      const file = files[0];
      if (file) {
        void replaceModel(model.id, file);
      }
    },
  });

  return (
    <LibrarySectionCollapsible
      title={model.fileName}
      className="items-start p-2 border rounded-sm border-zinc-700"
      headerClassName="items-start"
      contentClassName="flex-col w-full items-start"
      actionsClassName="w-full items-end justify-end"
      actions={(
        <>
          <Button
            onClick={() => openReplace()}
            variant="ghost"
            aria-label="Replace model"
            title="Replace model"
            className="p-1.5"
          >
            <ReplaceIcon />
          </Button>
          <Button
            onClick={() => removeModel(model.id)}
            variant="ghost"
            aria-label="Remove model"
            title="Remove model"
            className="p-1.5"
          >
            <TrashIcon />
          </Button>
        </>
      )}
    >
      {replaceInput}

      <ClipRows clips={ownedClips} />
    </LibrarySectionCollapsible>
  );
}
