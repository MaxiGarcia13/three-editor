import { cn } from '@maxigarcia/js-utils';
import { Button } from '@/components/button';
import { Text } from '@/components/text';

type AssetStatus = 'ready' | 'error';

interface AssetEntryProps {
  label: string;
  title?: string;
  /** Secondary line under the name (source file, short error, etc.). */
  description?: string | null;
  /** Full error text for tooltip when description is a short summary. */
  errorDetail?: string | null;
  status?: AssetStatus;
  statusLabel?: string;
  onReplace: () => void;
  onRemove: () => void;
  replaceDisabled?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  /** Leading action (e.g. Retarget) — rendered before Replace / Remove. */
  primaryAction?: React.ReactNode;
}

const statusBadgeClass: Record<AssetStatus, string> = {
  ready: 'bg-emerald-500/15 text-emerald-400',
  error: 'bg-amber-500/15 text-amber-400',
};

const defaultStatusLabel: Record<AssetStatus, string> = {
  ready: 'Ready',
  error: 'Needs attention',
};

export function AssetEntry({
  label,
  title,
  description,
  errorDetail,
  status,
  statusLabel,
  onReplace,
  onRemove,
  replaceDisabled = false,
  selected = false,
  onSelect,
  primaryAction,
}: AssetEntryProps) {
  const hasError = status === 'error';
  const badgeText = statusLabel ?? (status ? defaultStatusLabel[status] : null);

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-sm p-2 ring-1',
        selected
          ? 'bg-sky-500/10 ring-sky-400/40'
          : hasError
            ? 'bg-zinc-800/40 ring-amber-500/25'
            : 'bg-zinc-800/40 ring-zinc-700/80',
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        disabled={!onSelect}
        className={cn(
          'flex w-full flex-col gap-1 rounded-sm text-left',
          onSelect ? 'cursor-pointer' : 'cursor-default',
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <Text className="min-w-0 truncate text-zinc-100" title={title ?? label}>
            {label}
          </Text>
          {badgeText && status && (
            <Text
              as="span"
              className={cn(
                'shrink-0 rounded-sm px-1.5 py-0.5 leading-none',
                statusBadgeClass[status],
              )}
            >
              {badgeText}
            </Text>
          )}
        </div>
        {description && (
          <Text
            variant={hasError ? 'error' : 'muted'}
            className="leading-snug line-clamp-2"
            title={errorDetail ?? description}
          >
            {description}
          </Text>
        )}
      </button>

      <div className="flex flex-wrap items-center gap-1">
        {primaryAction}
        <Button
          onClick={onReplace}
          disabled={replaceDisabled}
          variant="ghost"
          className="px-2"
        >
          Replace
        </Button>
        <Button onClick={onRemove} variant="ghost" className="px-2">
          Remove
        </Button>
      </div>
    </div>
  );
}
