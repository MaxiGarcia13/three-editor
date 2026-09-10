import type { ModelEntry } from '@/modules/viewport/types/model';

import { useStore } from '@nanostores/react';
import { useState } from 'react';
import { useAssetEntryRename } from '@/components/asset-entry/use-asset-entry-rename';
import { useGltfFilePicker } from '@/components/gltf-file-picker/use-gltf-file-picker';
import { ClipRows } from '@/modules/animation/components/clip-rows';
import { $clips } from '@/modules/animation/stores/clip-store';
import { LibrarySectionCollapsible } from '@/modules/editor-shell/components/library-section-collapsible';
import {
  removeModel,
  renameModel,
  replaceModel,
} from '@/modules/viewport/stores/model-store';
import { LibraryModelActions } from './library-model-actions';
import { LibraryModelAddAnimationModal } from './library-model-add-animation-modal';
import { LibraryModelTitle } from './library-model-title';

interface LibraryModelProps {
  model: ModelEntry;
}

export function LibraryModel({ model }: LibraryModelProps) {
  const { clips } = useStore($clips, { keys: ['clips'] });
  const [addAnimationOpen, setAddAnimationOpen] = useState(false);
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
    <>
      <LibrarySectionCollapsible
        title={(
          <LibraryModelTitle
            modelId={model.id}
            fileName={model.fileName}
            rename={rename}
          />
        )}
        className="ml-5"
        headerContentClassName="flex-col w-full"
        actionsClassName="w-full justify-end"
        actions={(
          <LibraryModelActions
            conflictedClipId={conflictedClip?.id ?? null}
            onAddAnimation={() => setAddAnimationOpen(true)}
            onRename={rename.startEditing}
            onReplace={() => openReplace()}
            onRemove={() => removeModel(model.id)}
          />
        )}
      >
        <ClipRows clips={ownedClips} />
      </LibrarySectionCollapsible>

      {replaceInput}

      <LibraryModelAddAnimationModal
        open={addAnimationOpen}
        onClose={() => setAddAnimationOpen(false)}
        ownerModelId={model.id}
        scene={model.scene}
      />
    </>
  );
}
