import { Collapsible, CollapsibleContent, CollapsibleHeader } from '@/components/collapsible';
import { Text } from '@/components/text';

interface LibrarySectionCollapsibleProps {
  title: string;
  leading?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function LibrarySectionCollapsible({
  title,
  leading,
  actions,
  children,
  defaultOpen,
  className,
}: LibrarySectionCollapsibleProps) {
  return (
    <Collapsible defaultOpen={defaultOpen} className={className}>
      <CollapsibleHeader>
        {leading}

        <Text as="h2" variant="section" className="flex-1 min-w-0 truncate">
          {title}
        </Text>

        {actions && (
          <div
            className="flex items-center gap-0.5 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {actions}
          </div>
        )}
      </CollapsibleHeader>
      <CollapsibleContent>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
