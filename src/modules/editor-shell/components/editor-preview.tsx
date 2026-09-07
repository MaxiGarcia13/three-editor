import { ViewportCanvas } from '@/modules/viewport/components/viewport-canvas';

export function EditorPreview() {
  return (
    <div className="flex-1 h-full bg-zinc-900">
      <ViewportCanvas />
    </div>
  );
}
