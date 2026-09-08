import { TimelineScrubber } from '@/components/timeline-scrubber';
import {
  ClipSelector,
  ClipTrimInputs,
  PlaybackControls,
  SpeedControl,
  useClipTimelineScrubber,
} from '@/modules/animation';

export function PreviewPlaybackBar() {
  const timeline = useClipTimelineScrubber();

  return (
    <div className="shrink-0 border-t border-zinc-700 bg-zinc-800/95 px-4 py-3 flex flex-row gap-4 w-full">
      <div className="flex flex-col gap-2 min-w-75">
        <ClipSelector />
        <PlaybackControls />
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex flex-row gap-2 items-end">
          <ClipTrimInputs />
          <SpeedControl />
        </div>

        <TimelineScrubber
          {...timeline}
          aria-label="Animation timeline"
          className="min-h-32"
        />
      </div>
    </div>
  );
}
