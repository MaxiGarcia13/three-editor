import type { ReactNode } from 'react';

export interface EditorPreviewProps {
  children?: ReactNode;
}

export function EditorPreview(_props: EditorPreviewProps) {
  return (
    <div className="flex-1 w-full h-full">Preview</div>
  );
}
