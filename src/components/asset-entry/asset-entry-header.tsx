import type { AssetStatus } from './types';
import { cn } from '@maxigarcia/js-utils';
import { Text } from '@/components/text';
import { defaultStatusLabel, statusBadgeClass } from './constants';

interface AssetEntryHeaderProps {
  label: string;
  title?: string;
  description?: string | null;
  errorDetail?: string | null;
  status?: AssetStatus;
  statusLabel?: string;
  canRename: boolean;
  onSelect?: () => void;
  onStartRename?: () => void;
}

export function AssetEntryHeader({
  label,
  title,
  description,
  errorDetail,
  status,
  statusLabel,
  canRename,
  onSelect,
  onStartRename,
}: AssetEntryHeaderProps) {
  const hasError = status === 'error';
  const badgeText = statusLabel ?? (status ? defaultStatusLabel[status] : null);

  return (
    <button
      type="button"
      onClick={onSelect}
      onDoubleClick={canRename ? onStartRename : undefined}
      disabled={!onSelect}
      className={cn(
        'flex w-full flex-col gap-1 rounded-sm text-left',
        onSelect ? 'cursor-pointer' : 'cursor-default',
        canRename ? 'group' : '',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <Text
          className="min-w-0 truncate text-zinc-100 group-hover:underline"
          title={title ?? label}
        >
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
  );
}
