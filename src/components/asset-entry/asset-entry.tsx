import { cn } from '@maxigarcia/js-utils';
import { Button } from '@/components/button/button';

interface AssetEntryProps {
  label: string;
  title?: string;
  error?: string | null;
  onReplace: () => void;
  onRemove: () => void;
  replaceDisabled?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}

export function AssetEntry({
  label,
  title,
  error,
  onReplace,
  onRemove,
  replaceDisabled = false,
  selected = false,
  onSelect,
}: AssetEntryProps) {
  const hasError = Boolean(error);

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded p-2',
        selected && 'bg-sky-500/10 ring-1 ring-sky-400/40',
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        disabled={!onSelect}
        className={cn(
          'flex flex-col gap-2 rounded text-left',
          onSelect ? 'cursor-pointer' : 'cursor-default',
          hasError ? 'text-red-400' : 'text-green-400',
        )}
      >
        <span className="text-xs truncate" title={title ?? error ?? label}>
          {label}
        </span>
        {hasError && (
          <span
            className="text-[10px] text-red-400/80 leading-snug line-clamp-2"
            title={error ?? undefined}
          >
            {error}
          </span>
        )}
      </button>
      <div className="flex gap-2">
        <Button
          onClick={onReplace}
          disabled={replaceDisabled}
          variant="ghost"
          className="flex-1 text-xs"
        >
          Replace
        </Button>
        <Button onClick={onRemove} variant="ghost" className="flex-1 text-xs">
          Remove
        </Button>
      </div>
    </div>
  );
}
