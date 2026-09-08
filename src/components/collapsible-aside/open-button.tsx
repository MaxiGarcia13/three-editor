import { Button } from '../button';
import { ChevronLeft } from '../icons/chevron-left';
import { ChevronRight } from '../icons/chevron-right';

interface OpenButtonProps {
  direction: 'left' | 'right';
  onToggle: () => void;
  title: string;
}

export function OpenButton({ direction, onToggle, title }: OpenButtonProps) {
  const ariaLabel = `Expand ${title} sidebar`;

  if (direction === 'left') {
    return (
      <Button
        onClick={onToggle}
        aria-label={ariaLabel}
        className="absolute top-3 z-1 left-3 flex items-center gap-2"
      >
        <span className="text-sm font-semibold tracking-wide">{title}</span>

        <ChevronRight />
      </Button>
    );
  }

  return (
    <Button
      onClick={onToggle}
      aria-label={ariaLabel}
      className="absolute top-3 z-1 right-3 flex items-center gap-2"
    >
      <ChevronLeft />

      <span className="text-sm font-semibold tracking-wide">{title}</span>
    </Button>
  );
}
