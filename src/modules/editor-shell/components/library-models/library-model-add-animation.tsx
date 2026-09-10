import type { Group } from 'three';
import { useStore } from '@nanostores/react';
import { useState } from 'react';
import { Button } from '@/components/button';
import { Select } from '@/components/select';
import { Text } from '@/components/text';
import { $clips, cloneClipAs, startNewAnimation } from '@/modules/animation/stores/clip-store';

interface LibraryModelAddAnimationProps {
  ownerModelId: string;
  scene: Group;
}

export function LibraryModelAddAnimation({
  ownerModelId,
  scene,
}: LibraryModelAddAnimationProps) {
  const { clips } = useStore($clips, { keys: ['clips'] });
  const [sourceId, setSourceId] = useState('');
  const [addAnimation, setAddAnimation] = useState(false);

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

  return (
    <div className="flex gap-2 flex-col">
      <div className="flex gap-2">
        <Button
          onClick={() => startNewAnimation(scene, ownerModelId)}
          variant="ghost"
          className="justify-start items-center flex gap-2"
        >
          Create animation
        </Button>

        <Button
          onClick={() => setAddAnimation(!addAnimation)}
          variant="ghost"
          className="justify-start items-center flex gap-2"
        >
          {addAnimation ? 'Cancel' : 'Add animation'}
        </Button>
      </div>

      {addAnimation && (
        <div className="flex items-center gap-1">
          <Select
            value={sourceId}
            onChange={(event) => setSourceId(event.target.value)}
            aria-label="Clip to add"
            placeholder="Add animation…"
            className="flex-1 min-w-0"
            options={cloneableClips.map((entry) => ({
              value: entry.id,
              label: entry.name,
            }))}
          />

          <Button
            onClick={() => {
              cloneClipAs(sourceId, ownerModelId);
              setSourceId('');
              setAddAnimation(false);
            }}
            disabled={!sourceId}
            variant="ghost"
            className="px-2 py-1.5"
          >
            <Text as="span" size="xs">Add</Text>
          </Button>
        </div>
      )}
    </div>
  );
}
