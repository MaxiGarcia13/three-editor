import { Button } from '@/components/button';
import { ChevronLeft } from '@/components/icons/chevron-left';
import { ChevronRight } from '@/components/icons/chevron-right';
import { Text } from '@/components/text';

interface AsideHeaderProps {
  direction: 'left' | 'right';
  className?: string;
  title: string;
  onToggle: () => void;
}

export function AsideHeader({ direction, title, onToggle }: AsideHeaderProps) {
  const ariaLabel = `Collapse ${title} sidebar`;

  if (direction === 'left') {
    return (
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700">
        <Text size="sm" variant="heading">{title}</Text>
        <Button
          onClick={onToggle}
          aria-label={ariaLabel}
          variant="ghost"
        >
          <ChevronLeft />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700">
      <Button
        onClick={onToggle}
        aria-label={ariaLabel}
        variant="ghost"
      >
        <ChevronRight />
      </Button>
      <Text size="sm" variant="heading">{title}</Text>
    </div>
  );
}
