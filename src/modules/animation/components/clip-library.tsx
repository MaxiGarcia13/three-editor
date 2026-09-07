import { useStore } from '@nanostores/react';
import { useRef } from 'react';
import { AssetEntry } from '@/components/asset-entry/asset-entry';
import { GLTF_FILE_ACCEPT } from '@/modules/viewport/constants/gltf-file';
import { useActiveModel } from '@/modules/viewport/hooks/use-active-model';
import { $clips, removeClip, replaceClip } from '../stores/clip-store';

export function ClipLibrary() {
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const replaceTargetIdRef = useRef<string | null>(null);

  const { clips } = useStore($clips, { keys: ['clips'] });
  const { scene } = useActiveModel();

  if (clips.length === 0) {
    return null;
  }

  const handleReplaceClick = (id: string) => {
    replaceTargetIdRef.current = id;
    replaceInputRef.current?.click();
  };

  const handleReplaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const id = replaceTargetIdRef.current;
    if (file && id) {
      void replaceClip(id, file, scene);
    }
    replaceTargetIdRef.current = null;
    event.target.value = '';
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={replaceInputRef}
        type="file"
        accept={GLTF_FILE_ACCEPT}
        onChange={handleReplaceChange}
        className="hidden"
      />

      {clips.map((entry) => (
        <AssetEntry
          key={entry.id}
          label={entry.name}
          title={entry.error ?? `${entry.name} (${entry.sourceFile})`}
          error={entry.status === 'error' ? entry.error : null}
          onReplace={() => handleReplaceClick(entry.id)}
          onRemove={() => removeClip(entry.id)}
          replaceDisabled={scene === null}
        />
      ))}
    </div>
  );
}
