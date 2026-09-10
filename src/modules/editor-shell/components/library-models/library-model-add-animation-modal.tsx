import type { Group } from 'three';
import { useStore } from '@nanostores/react';
import { useState } from 'react';
import { Button } from '@/components/button';
import { useGltfFilePicker } from '@/components/gltf-file-picker/use-gltf-file-picker';
import { UploadIcon } from '@/components/icons/upload-icon';
import { Modal } from '@/components/modal';
import { Select } from '@/components/select';
import { Text } from '@/components/text';
import {
  $clips,
  cloneClipAs,
  importClipFiles,
  startNewAnimation,
} from '@/modules/animation/stores/clip-store';

interface LibraryModelAddAnimationModalProps {
  open: boolean;
  onClose: () => void;
  ownerModelId: string;
  scene: Group;
}

export function LibraryModelAddAnimationModal({
  open,
  onClose,
  ownerModelId,
  scene,
}: LibraryModelAddAnimationModalProps) {
  const { clips } = useStore($clips, { keys: ['clips'] });
  const [sourceId, setSourceId] = useState('');

  const ownedNames = new Set(
    clips
      .filter((entry) => entry.ownerModelId === ownerModelId)
      .map((entry) => entry.name),
  );

  const cloneableClips = clips.filter((entry) => {
    if (entry.clip === null) {
      return false;
    }
    if (entry.ownerModelId === ownerModelId) {
      return false;
    }
    return !ownedNames.has(entry.name);
  });

  if (sourceId !== '' && !cloneableClips.some((entry) => entry.id === sourceId)) {
    setSourceId('');
  }

  function handleClose(): void {
    setSourceId('');
    onClose();
  }

  const { open: openImport, fileInput } = useGltfFilePicker({
    multiple: true,
    onFiles: (files) => {
      void importClipFiles(files, scene, ownerModelId).then(handleClose);
    },
  });

  return (
    <Modal
      open={open}
      title="Add animation"
      onClose={handleClose}
      className="max-w-md"
    >
      {fileInput}
      <div className="flex flex-col gap-4">
        <Button
          onClick={() => {
            startNewAnimation(scene, ownerModelId);
            handleClose();
          }}
          variant="default"
          className="justify-start"
        >
          Create new
        </Button>

        <Button
          onClick={() => openImport()}
          variant="default"
          className="justify-start items-center flex gap-2"
        >
          <UploadIcon />
          Import
        </Button>

        <div className="flex flex-col gap-2">
          <Text variant="muted">Add existing</Text>
          <div className="flex items-center gap-1">
            <Select
              value={sourceId}
              onChange={(event) => setSourceId(event.target.value)}
              aria-label="Clip to add"
              placeholder="Choose animation…"
              className="flex-1 min-w-0"
              options={cloneableClips.map((entry) => ({
                value: entry.id,
                label: entry.name,
              }))}
            />
            <Button
              onClick={() => {
                cloneClipAs(sourceId, ownerModelId);
                handleClose();
              }}
              disabled={!sourceId}
              variant="ghost"
              className="px-2 py-1.5"
            >
              <Text as="span" size="xs">Add</Text>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
