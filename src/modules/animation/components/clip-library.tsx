import { useStore } from '@nanostores/react';

import { AssetEntry } from '@/components/asset-entry/asset-entry';
import { useGltfFilePicker } from '@/components/gltf-file-picker/use-gltf-file-picker';
import { useActiveModel } from '@/modules/viewport/hooks/use-active-model';
import { $clips, removeClip, replaceClip } from '../stores/clip-store';

export function ClipLibrary() {
  const { clips } = useStore($clips, { keys: ['clips'] });
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
        <AssetEntry
          key={entry.id}
          label={entry.name}
          title={entry.error ?? `${entry.name} (${entry.sourceFile})`}
          error={entry.status === 'error' ? entry.error : null}
          onReplace={() => openReplace(entry.id)}
          onRemove={() => removeClip(entry.id)}
          replaceDisabled={scene === null}
        />
      ))}
    </div>
  );
}
