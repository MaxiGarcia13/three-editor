import { Button } from '@/components/button/button';

interface AssetEntryProps {
  label: string;
  title?: string;
  error?: string | null;
  onReplace: () => void;
  onRemove: () => void;
  replaceDisabled?: boolean;
}

export function AssetEntry({
  label,
  title,
  error,
  onReplace,
  onRemove,
  replaceDisabled = false,
}: AssetEntryProps) {
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`text-xs truncate ${hasError ? 'text-red-400' : 'text-green-400'}`}
        title={title ?? error ?? label}
      >
        {label}
      </div>
      {hasError && (
        <p className="text-[10px] text-red-400/80 leading-snug line-clamp-2" title={error ?? undefined}>
          {error}
        </p>
      )}
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
