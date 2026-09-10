import { Button } from '@/components/button';
import { EditIcon } from '@/components/icons/edit-icon';
import { ReplaceIcon } from '@/components/icons/replace-icon';
import { TrashIcon } from '@/components/icons/trash-icon';

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
    <div className="flex flex-wrap items-center justify-end gap-0.5">
      {primaryAction}
      {canRename && !editing && (
        <Button onClick={onStartRename} variant="ghost" aria-label="Rename" className="p-1.5">
          <EditIcon />
        </Button>
      )}
      <Button
        onClick={onReplace}
        disabled={replaceDisabled}
        variant="ghost"
        aria-label="Replace"
        className="p-1.5"
      >
        <ReplaceIcon />
      </Button>
      <Button onClick={onRemove} variant="ghost" aria-label="Remove" className="p-1.5">
        <TrashIcon />
      </Button>
    </div>
  );
}
