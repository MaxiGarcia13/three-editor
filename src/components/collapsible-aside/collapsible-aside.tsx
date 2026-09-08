import { cn } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { isMobileViewport } from '@/utils/device';
import { AsideHeader } from './aside-header';
import { OpenButton } from './open-button';

const SIDEBAR_WIDTH = '16rem';

interface CollapsibleAsideProps {
  children: React.ReactNode;
  title: string;
  direction: 'left' | 'right';
  className?: string;
}

export function CollapsibleAside({ children, direction, title, className }: CollapsibleAsideProps) {
  const isMobile = isMobileViewport();

  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const { marginDirection, borderDirection }
    = direction === 'left'
      ? {
          marginDirection: 'marginLeft',
          borderDirection: 'border-r',
        }
      : {
          marginDirection: 'marginRight',
          borderDirection: 'border-l',
        };

  if (!sidebarOpen) {
    return (
      <OpenButton
        direction={direction}
        onToggle={toggleSidebar}
        title={title}
      />
    );
  }

  return (
    <aside
      className={
        cn(
          'flex flex-col shrink-0 bg-zinc-800 border-l border-zinc-700 transition-transform duration-300',
          borderDirection,
          isMobile && `absolute z-20 h-full ${direction === 'left' ? 'left-0' : 'right-0'}`,
          className,
        )
      }
      style={{
        width: SIDEBAR_WIDTH,
        [marginDirection]: sidebarOpen ? 0 : `calc(-1 * ${SIDEBAR_WIDTH})`,
      }}
    >
      <AsideHeader
        direction={direction}
        onToggle={toggleSidebar}
        title={title}
      />

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        {children}
      </div>
    </aside>
  );
}
