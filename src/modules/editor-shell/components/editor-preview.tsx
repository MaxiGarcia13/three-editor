import { SaveKeyframeButton } from '@/modules/animation';
import { ViewportCanvas } from '@/modules/viewport/components/viewport-canvas';
import { ViewportStatusOverlay } from '@/modules/viewport/components/viewport-status-overlay';
import { PreviewPlaybackBar } from './preview-playback-bar';

export function EditorPreview() {
  return (
    <div className="relative flex-1 flex flex-col min-w-0 h-full bg-zinc-900">
      <div className="relative flex-1 min-h-0">
        <ViewportCanvas />
        <ViewportStatusOverlay />
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center px-4">
          <SaveKeyframeButton />
        </div>
      </div>

      <PreviewPlaybackBar />
    </div>
  );
}
