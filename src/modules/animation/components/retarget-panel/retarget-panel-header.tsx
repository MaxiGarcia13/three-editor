import { Text } from '@/components/text';

interface RetargetPanelHeaderProps {
  mismatch: string;
  mappedCount: number;
  sourceCount: number;
  unmappedOnly: boolean;
  onUnmappedOnlyChange: (value: boolean) => void;
}

export function RetargetPanelHeader({
  mismatch,
  mappedCount,
  sourceCount,
  unmappedOnly,
  onUnmappedOnlyChange,
}: RetargetPanelHeaderProps) {
  return (
    <div className="flex flex-col gap-3 shrink-0">
      <Text as="p" variant="muted">
        Map each clip bone to a character bone. Short names are for reading;
        full ids stay on the tracks. Apply is still required.
      </Text>
      <Text as="p" variant="error" className="break-words">
        Mismatch:
        {' '}
        {mismatch}
      </Text>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <Text variant="heading" size="sm" className="shrink-0">
          {mappedCount}
          {' / '}
          {sourceCount}
          {' '}
          mapped
        </Text>
        <label className="flex items-center gap-2 cursor-pointer shrink-0">
          <input
            type="checkbox"
            checked={unmappedOnly}
            onChange={(event) => onUnmappedOnlyChange(event.target.checked)}
            className="size-3.5 shrink-0 rounded-sm border-zinc-600 accent-sky-500"
          />
          <Text variant="muted">Show unmapped only</Text>
        </label>
      </div>
    </div>
  );
}
