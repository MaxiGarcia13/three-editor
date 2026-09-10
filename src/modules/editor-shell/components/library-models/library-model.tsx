import type { ModelEntry } from '@/modules/viewport/types/model';

import { useStore } from '@nanostores/react';
import { AssetEntryRenameInput } from '@/components/asset-entry/asset-entry-rename-input';
import { useAssetEntryRename } from '@/components/asset-entry/use-asset-entry-rename';
import { Button } from '@/components/button';
import { useGltfFilePicker } from '@/components/gltf-file-picker/use-gltf-file-picker';
import { EditIcon } from '@/components/icons/edit-icon';
import { ModelIcon } from '@/components/icons/model-icon';
import { ReplaceIcon } from '@/components/icons/replace-icon';
import { RetargetIcon } from '@/components/icons/retarget-icon';
import { TrashIcon } from '@/components/icons/trash-icon';
import { ClipRows } from '@/modules/animation/components/clip-rows';
import { $clips } from '@/modules/animation/stores/clip-store';
import { openRetarget } from '@/modules/animation/stores/retarget-ui-store';
import { LibrarySectionCollapsible } from '@/modules/editor-shell/components/library-section-collapsible';
import { removeModel, renameModel, replaceModel } from '@/modules/viewport/stores/model-store';

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
      title={
        rename.editing
          ? (
              <div className="flex-1 min-w-0" onClick={(e) => e.stopPropagation()}>
                <AssetEntryRenameInput
                  inputRef={rename.inputRef}
                  value={rename.draft}
                  onChange={rename.setDraft}
                  onCommit={rename.commit}
                  onCancel={rename.cancel}
                />
              </div>
            )
          : model.fileName
      }
      className="items-start ml-4"
      headerClassName="items-start"
      contentClassName="flex-col w-full items-start"
      actionsClassName="w-full items-end justify-end"
      actions={(
        <>
          {
            conflictedClip && (
              <Button
                onClick={() => {
                  if (conflictedClip) {
                    openRetarget(conflictedClip.id);
                  }
                }}
                variant="ghost"
                disabled={conflictedClip === undefined}
                aria-label="Retarget conflicted clips"
                title={conflictedClip ? 'Retarget clips' : 'No clips need retarget'}
                className="p-1.5"
              >
                <RetargetIcon />
              </Button>
            )
          }

          <Button
            onClick={rename.startEditing}
            variant="ghost"
            aria-label="Rename model"
            title="Rename model"
            className="p-1.5"
          >
            <EditIcon />
          </Button>
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
