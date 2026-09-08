import { useStore } from '@nanostores/react';

import { useActiveModel } from '@/modules/viewport/hooks/use-active-model';
import { $clips, MAX_TIME_SCALE, MIN_TIME_SCALE, setTimeScale } from '../stores/clip-store';

export function SpeedControl() {
  const { timeScale, activeClipId } = useStore($clips, {
    keys: ['timeScale', 'activeClipId'],
  });
  const { scene } = useActiveModel();

  const enabled = scene !== null && activeClipId !== null;

  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-zinc-400">Speed</span>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={MIN_TIME_SCALE}
          max={MAX_TIME_SCALE}
          step={0.1}
          value={timeScale}
          onChange={(event) => setTimeScale(Number(event.currentTarget.value))}
          disabled={!enabled}
          aria-label="Playback speed multiplier"
          className="flex-1 accent-sky-500 disabled:opacity-40"
        />
        <span className="text-xs text-zinc-100 tabular-nums w-9 text-right">
          {timeScale.toFixed(1)}
          x
        </span>
      </div>
    </label>
  );
}
