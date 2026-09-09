import { useStore } from '@nanostores/react';
import { AssetEntry } from '@/components/asset-entry/asset-entry';
import { Button } from '@/components/button';
import { useGltfFilePicker } from '@/components/gltf-file-picker/use-gltf-file-picker';
import { useActiveModel } from '@/modules/viewport/hooks/use-active-model';
import { $clips, removeClip, replaceClip } from '../stores/clip-store';
import { $retargetClipId, openRetarget } from '../stores/retarget-ui-store';
import { RetargetModal } from './retarget-modal';

export function ClipLibrary() {
  const { clips } = useStore($clips, { keys: ['clips'] });
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

  return (
    <div className="flex flex-col gap-3">
      {replaceInput}

      {clips.map((entry) => (
        <div key={entry.id} className="flex flex-col gap-2">
          <AssetEntry
            label={entry.name}
            title={entry.error ?? `${entry.name} (${entry.sourceFile})`}
            error={entry.status === 'error' ? entry.error : null}
            onReplace={() => openReplace(entry.id)}
            onRemove={() => removeClip(entry.id)}
            replaceDisabled={scene === null}
          />
          {entry.status === 'error' && entry.clip && (
            <>
              <Button
                onClick={() => openRetarget(entry.id)}
                variant={retargetClipId === entry.id ? 'primary' : 'ghost'}
                className="w-full"
              >
                {retargetClipId === entry.id ? 'Retargeting…' : 'Retarget'}
              </Button>
              <RetargetModal />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
