import { debounce } from '@maxigarcia/js-utils';

import { useStore } from '@nanostores/react';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/input/input';
import { Text } from '@/components/text';
import { useActiveModel } from '@/modules/viewport/hooks/use-active-model';
import {
  $clips,
  MAX_BLEND_FADE_DURATION,
  MAX_BLEND_WEIGHT,
  MIN_BLEND_FADE_DURATION,
  setBlendClip,
  setBlendFadeDuration,
  setBlendWeight,
} from '../stores/clip-store';

const BLEND_WEIGHT_DEBOUNCE_MS = 150;

export function BlendControls() {
  const {
    clips,
    activeClipId,
    blendClipId,
    blendWeight,
    blendFadeDuration,
  } = useStore($clips, {
    keys: ['clips', 'activeClipId', 'blendClipId', 'blendWeight', 'blendFadeDuration'],
  });
  const { scene } = useActiveModel();
  // Slider shows the user's last intent; store/mixer may still be fading toward it.
  const [draftWeight, setDraftWeight] = useState(blendWeight);
  const commitWeight = useRef(
    debounce((weight: number) => {
      setBlendWeight(weight);
    }, BLEND_WEIGHT_DEBOUNCE_MS),
  ).current;

  // External resets (clear blend clip → weight 0) should reset the thumb.
  useEffect(() => {
    setDraftWeight($clips.get().blendWeight);
  }, [blendClipId]);

  const readyClips = clips.filter((entry) => entry.status === 'ready' && entry.id !== activeClipId);
  const enabled = scene !== null && activeClipId !== null && readyClips.length > 0;
  const blendEnabled = enabled && blendClipId !== null;

  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-col gap-1">
        <Text variant="muted">Blend Clip</Text>
        <select
          value={blendClipId ?? ''}
          onChange={(event) => setBlendClip(event.target.value || null)}
          disabled={!enabled}
          className="bg-zinc-700 rounded-sm px-2 py-1.5 text-xs text-zinc-100 disabled:opacity-50"
        >
          <option value="">None</option>
          {readyClips.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {entry.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <Text variant="muted">Blend Weight</Text>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={MAX_BLEND_WEIGHT}
            step={0.01}
            value={draftWeight}
            onChange={(event) => {
              const next = Number(event.currentTarget.value);
              setDraftWeight(next);
              void commitWeight(next);
            }}
            disabled={!blendEnabled}
            aria-label="Blend weight"
            className="flex-1 accent-sky-500 disabled:opacity-40"
          />
          <Text variant="numeric" className="w-9 text-right text-zinc-100">
            {Math.round(draftWeight * 100)}
            %
          </Text>
        </div>
      </label>

      <Input
        label="Fade (s)"
        type="number"
        value={blendFadeDuration}
        min={MIN_BLEND_FADE_DURATION}
        max={MAX_BLEND_FADE_DURATION}
        step={0.1}
        onChange={(event) => setBlendFadeDuration(Number(event.currentTarget.value))}
        disabled={!blendEnabled}
      />
    </div>
  );
}
