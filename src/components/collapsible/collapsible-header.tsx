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
}: CollapsibleProps) {
  const { open, panelId, setOpen } = useCollapsible();

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={panelId}
      onClick={() => setOpen(!open)}
      className="flex items-center gap-1 min-h-7 text-left cursor-pointer text-zinc-400 hover:text-zinc-100 transition-colors"
    >
      <ChevronRight
        className={cn('shrink-0 transition-transform', open && 'rotate-90')}
        aria-hidden
      />

      <div className="flex items-center gap-2">
        {title && (
          <Text as="h2" variant="section">
            {title}
          </Text>
        )}

        {children}
      </div>
    </button>
  );
}
