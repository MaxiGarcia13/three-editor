import { cn } from '@maxigarcia/js-utils';
import { useId, useState } from 'react';
import { ChevronRight } from '@/components/icons/chevron-right-icon';
import { Text } from '@/components/text';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  /** Start expanded. Default false. */
  defaultOpen?: boolean;
  className?: string;
  contentClassName?: string;
}

export function Collapsible({
  title,
  children,
  defaultOpen = false,
  className,
  contentClassName,
}: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1 min-h-7 text-left cursor-pointer text-zinc-400 hover:text-zinc-100 transition-colors"
      >
        <ChevronRight
          className={cn('shrink-0 transition-transform', open && 'rotate-90')}
          aria-hidden
        />
        <Text as="h2" variant="section">
          {title}
        </Text>
      </button>

      {open && (
        <div id={panelId} className={cn('flex flex-col gap-3', contentClassName)}>
          {children}
        </div>
      )}
    </div>
  );
}
