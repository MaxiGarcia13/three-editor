import { ClipSelector, PlaybackControls, TimelineScrubber } from '@/modules/animation';

export function PreviewPlaybackBar() {
  return (
    <div className="shrink-0 border-t border-zinc-700 bg-zinc-800/95 px-4 py-3 flex flex-col gap-2">
      <ClipSelector />
      <PlaybackControls />
      <TimelineScrubber />
    </div>
  );
}
