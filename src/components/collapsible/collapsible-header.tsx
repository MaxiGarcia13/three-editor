import { cn } from '@maxigarcia/js-utils';
import { ChevronRight } from '@/components/icons/chevron-right-icon';
import { Text } from '@/components/text';
import { useCollapsible } from './collapsible-context';

interface CollapsibleProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export function CollapsibleHeader({
  title,
  children,
  className,
}: CollapsibleProps) {
  const { open, panelId, setOpen } = useCollapsible();

  return (
    <header
      role="button"
      aria-expanded={open}
      aria-controls={panelId}
      tabIndex={0}
      onClick={() => setOpen(!open)}
      className={cn('flex items-start gap-1 min-h-7 w-full text-left cursor-pointer text-zinc-400 hover:text-zinc-100 transition-colors', className)}
    >
      <span className="inline-flex h-7 w-4 shrink-0 items-center justify-center">
        <ChevronRight
          className={cn('transition-transform', open && 'rotate-90')}
          aria-hidden
        />
      </span>

      <div className="flex min-h-7 flex-1 items-center gap-2">
        {title && (
          <Text as="h2" variant="section">
            {title}
          </Text>
        )}

        {children}
      </div>
    </header>
  );
}
