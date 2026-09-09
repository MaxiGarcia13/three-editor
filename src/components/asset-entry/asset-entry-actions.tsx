import { Button } from '@/components/button';

interface AssetEntryActionsProps {
  primaryAction?: React.ReactNode;
  canRename: boolean;
  editing: boolean;
  replaceDisabled: boolean;
  onStartRename: () => void;
  onReplace: () => void;
  onRemove: () => void;
}

export function AssetEntryActions({
  primaryAction,
  canRename,
  editing,
  replaceDisabled,
  onStartRename,
  onReplace,
  onRemove,
}: AssetEntryActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {primaryAction}
      {canRename && !editing && (
        <Button onClick={onStartRename} variant="ghost" className="px-2">
          Rename
        </Button>
      )}
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
  );
}
