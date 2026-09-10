import type { ModelEntry } from '@/modules/viewport/types/model';

import { useStore } from '@nanostores/react';
import { useAssetEntryRename } from '@/components/asset-entry/use-asset-entry-rename';
import { useGltfFilePicker } from '@/components/gltf-file-picker/use-gltf-file-picker';
import { ClipRows } from '@/modules/animation/components/clip-rows';
import { $clips } from '@/modules/animation/stores/clip-store';
import { LibrarySectionCollapsible } from '@/modules/editor-shell/components/library-section-collapsible';
import { removeModel, renameModel, replaceModel } from '@/modules/viewport/stores/model-store';
import { LibraryModelActions } from './library-model-actions';
import { LibraryModelAddAnimation } from './library-model-add-animation';
import { LibraryModelTitle } from './library-model-title';

interface LibraryModelProps {
  model: ModelEntry;
}

export function LibraryModel({ model }: LibraryModelProps) {
  const { clips } = useStore($clips, { keys: ['clips'] });
  const ownedClips = clips.filter((entry) => entry.ownerModelId === model.id);
  const conflictedClip = ownedClips.find(
    (entry) => entry.status === 'error' && entry.clip !== null,
  );

  const rename = useAssetEntryRename({
    label: model.fileName,
    onRename: (name) => renameModel(model.id, name),
  });

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
      title={<LibraryModelTitle fileName={model.fileName} rename={rename} />}
      className="items-start ml-4"
      headerClassName="items-start"
      headerContentClassName="flex-col w-full items-start"
      actionsClassName="w-full items-end justify-end"
      actions={(
        <LibraryModelActions
          conflictedClipId={conflictedClip?.id ?? null}
          onRename={rename.startEditing}
          onReplace={() => openReplace()}
          onRemove={() => removeModel(model.id)}
        />
      )}
    >
      {replaceInput}

      <LibraryModelAddAnimation ownerModelId={model.id} scene={model.scene} />

      <ClipRows clips={ownedClips} />
    </LibrarySectionCollapsible>
  );
}
