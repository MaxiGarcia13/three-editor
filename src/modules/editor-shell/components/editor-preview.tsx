import { cn } from '@maxigarcia/js-utils';
import { SaveKeyframeButton } from '@/modules/animation';
import { SelectionNameOverlay } from '@/modules/viewport/components/selection-name-overlay';
import { TransformModeToolbar } from '@/modules/viewport/components/transform-mode-toolbar';
import { ViewportCanvas } from '@/modules/viewport/components/viewport-canvas';
import { ViewportStatusOverlay } from '@/modules/viewport/components/viewport-status-overlay';
import { isMobileViewport } from '@/utils/device';
import { PreviewPlaybackBar } from './preview-playback-bar';

export function EditorPreview() {
  const isMobile = isMobileViewport();

  return (
    <div className="relative flex-1 flex flex-col min-w-0 h-full bg-zinc-900">
      <div className="relative flex-1 min-h-0">
        <ViewportCanvas />
        <ViewportStatusOverlay />
        <div className={
          cn(
            'pointer-events-none absolute inset-x-0 z-10 flex justify-center px-4',
            isMobile ? 'top-16' : 'top-4',
          )
        }
        >
          <TransformModeToolbar />
        </div>
        <div className="pointer-events-none absolute z-10 flex right-2 bottom-4 justify-end pr-4">
          <SelectionNameOverlay />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center px-4">
          <SaveKeyframeButton />
        </div>
      </div>

      <PreviewPlaybackBar />
    </div>
  );
}
