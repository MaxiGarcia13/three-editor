import { useStore } from '@nanostores/react';

import { AssetEntry } from '@/components/asset-entry';
import { Button } from '@/components/button';
import { useGltfFilePicker } from '@/components/gltf-file-picker/use-gltf-file-picker';
import { Text } from '@/components/text';
import { useActiveModel } from '@/modules/viewport/hooks/use-active-model';
import {
  $clips,
  removeClip,
  renameClip,
  replaceClip,
  selectClip,
} from '../stores/clip-store';
import { $retargetClipId, openRetarget } from '../stores/retarget-ui-store';
import { RetargetModal } from './retarget-modal';

export function ClipLibrary() {
  const { clips, activeClipId, blendClipId } = useStore($clips, {
    keys: ['clips', 'activeClipId', 'blendClipId'],
  });
  const retargetClipId = useStore($retargetClipId);
  const { scene } = useActiveModel();

  const { open: openReplace, fileInput: replaceInput } = useGltfFilePicker<string>({
    onFiles: (files, id) => {
      const file = files[0];
      if (file && id) {
        void replaceClip(id, file, scene);
      }
    },
  });

  if (clips.length === 0) {
    return null;
  }

  const hasErrors = clips.some((entry) => entry.status === 'error');

  return (
    <div className="flex flex-col gap-3">
      {replaceInput}
      <RetargetModal />

      {hasErrors && (
        <Text as="p" variant="muted">
          Some animations need retargeting before they can play on this model.
        </Text>
      )}

      {clips.map((entry) => {
        const isError = entry.status === 'error';
        const isDraft = entry.status === 'draft';
        const canRetarget = isError && entry.clip !== null;
        const isRetargeting = retargetClipId === entry.id;
        const roleLabel
          = entry.id === blendClipId
            ? 'Blend'
            : isDraft
              ? 'Draft'
              : undefined;

        return (
          <AssetEntry
            key={entry.id}
            label={entry.name}
            title={`${entry.name} (${entry.sourceFile})`}
            description={isError ? entry.error : entry.sourceFile}
            errorDetail={entry.error}
            status={isError ? 'error' : undefined}
            statusLabel={
              roleLabel ?? (isError ? (canRetarget ? 'Needs retarget' : 'Failed') : undefined)
            }
            selected={entry.id === activeClipId}
            onSelect={isError ? undefined : () => selectClip(entry.id)}
            onReplace={() => openReplace(entry.id)}
            onRemove={() => removeClip(entry.id)}
            onRename={(name) => renameClip(entry.id, name)}
            replaceDisabled={scene === null || isDraft}
            primaryAction={
              canRetarget
                ? (
                    <Button
                      onClick={() => openRetarget(entry.id)}
                      variant="primary"
                      className="px-2"
                      disabled={isRetargeting}
                    >
                      {isRetargeting ? 'Retargeting…' : 'Retarget'}
                    </Button>
                  )
                : undefined
            }
          />
        );
      })}
    </div>
  );
}
