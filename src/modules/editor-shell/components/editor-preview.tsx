import { ViewportCanvas } from '@/modules/viewport/components/viewport-canvas';
import { ViewportStatusOverlay } from '@/modules/viewport/components/viewport-status-overlay';

export function EditorPreview() {
  return (
    <div className="relative flex-1 h-full bg-zinc-900">
      <ViewportCanvas />
      <ViewportStatusOverlay />
    </div>
  );
}
