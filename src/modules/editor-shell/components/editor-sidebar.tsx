import { useState } from 'react';

import { Button } from '@/components/button/button';
import { ChevronLeft } from '@/components/icons/chevron-left';
import { ChevronRight } from '@/components/icons/chevron-right';
import { ClipImport } from '@/modules/animation/components/clip-import';
import { ClipLibrary } from '@/modules/animation/components/clip-library';
import { ModelUpload } from './model-upload';

const SIDEBAR_WIDTH = '16rem';

export function EditorSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!sidebarOpen) {
    return (
      <Button
        onClick={toggleSidebar}
        aria-label="Expand sidebar"
        className="absolute top-3 left-3 z-1"
      >
        <ChevronRight />
      </Button>
    );
  }

  return (
    <aside
      className="flex flex-col shrink-0 bg-zinc-800 border-r border-zinc-700 transition-transform duration-300"
      style={{
        width: SIDEBAR_WIDTH,
        marginLeft: sidebarOpen ? 0 : `calc(-1 * ${SIDEBAR_WIDTH})`,
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700">
        <span className="text-sm font-semibold tracking-wide">Editor</span>
        <Button
          onClick={toggleSidebar}
          aria-label="Collapse sidebar"
          variant="ghost"
        >
          <ChevronLeft />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Model
          </h2>
          <ModelUpload />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Animations
          </h2>

          <ClipImport />

          <ClipLibrary />
        </section>
      </div>
    </aside>
  );
}
