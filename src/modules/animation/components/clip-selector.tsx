import { cn } from '@maxigarcia/js-utils';

import { useStore } from '@nanostores/react';
import { useId } from 'react';
import { Text } from '@/components/text';
import { useActiveModel } from '@/modules/viewport/hooks/use-active-model';
import { $clips, selectClip } from '../stores/clip-store';

interface ClipSelectorProps {
  className?: string;
}

export function ClipSelector({ className }: ClipSelectorProps) {
  const id = useId();
  const { clips, activeClipId } = useStore($clips, { keys: ['clips', 'activeClipId'] });
  const { scene } = useActiveModel();

  const readyClips = clips.filter((entry) => entry.status === 'ready');
  const enabled = scene !== null && readyClips.length > 0;

  return (
    <label className={cn('flex flex-col gap-1', className)} htmlFor={id}>
      <Text variant="muted">Active Clip</Text>
      <select
        id={id}
        value={activeClipId ?? ''}
        onChange={(event) => selectClip(event.target.value)}
        disabled={!enabled}
        className="bg-zinc-700 rounded-sm px-2 py-1.5 text-xs text-zinc-100 disabled:opacity-50"
      >
        {!enabled && <option value="">No clips — import an animation</option>}
        {readyClips.map((entry) => (
          <option key={entry.id} value={entry.id}>
            {entry.name}
          </option>
        ))}
      </select>
    </label>
  );
}
