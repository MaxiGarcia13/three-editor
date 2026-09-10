import { cn } from '@maxigarcia/js-utils';
import { Collapsible, CollapsibleContent, CollapsibleHeader } from '@/components/collapsible';
import { Text } from '@/components/text';

interface Props {
  title: string;
  leading?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  actionsClassName?: string;
}

export function LibrarySectionCollapsible({
  title,
  leading,
  actions,
  children,
  defaultOpen,
  className,
  headerClassName,
  contentClassName,
  actionsClassName,
}: Props) {
  return (
    <Collapsible defaultOpen={defaultOpen} className={className}>
      <CollapsibleHeader className={headerClassName}>
        {leading}
        <div className={cn('flex items-center gap-2 flex-1 min-w-0', contentClassName)}>
          <Text as="h2" variant="section" className="flex-1 min-w-0 truncate">
            {title}
          </Text>
          {actions && (
            <div
              className={cn('flex items-center gap-0.5 shrink-0', actionsClassName)}
              onClick={(e) => e.stopPropagation()}
            >
              {actions}
            </div>
          )}
        </div>
      </CollapsibleHeader>
      <CollapsibleContent>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
