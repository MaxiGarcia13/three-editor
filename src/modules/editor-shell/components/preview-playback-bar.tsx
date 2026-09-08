import { TimelineScrubber } from '@/components/timeline-scrubber';
import {
  ClipSelector,
  PlaybackControls,
  useClipTimelineScrubber,
} from '@/modules/animation';

export function PreviewPlaybackBar() {
  const timeline = useClipTimelineScrubber();

  return (
    <div className="shrink-0 border-t border-zinc-700 bg-zinc-800/95 px-4 py-3 w-full flex flex-col gap-2 items-between justify-center">
      <div className="flex flex-row gap-2 min-w-75">
        <ClipSelector className="min-w-40" />

        <PlaybackControls className="flex-1 flex items-center justify-center" />
      </div>

      <TimelineScrubber
        {...timeline}
        aria-label="Animation timeline"
        className="min-h-32 flex-1"
      />
    </div>
  );
}
