import { Button } from '@/components/button';
import { Text } from '@/components/text';

interface RetargetPanelActionsProps {
  complete: boolean;
  applyError: string | null;
  onCancel: () => void;
  onSubmit: () => void;
}

export function RetargetPanelActions({
  complete,
  applyError,
  onCancel,
  onSubmit,
}: RetargetPanelActionsProps) {
  return (
    <div className="flex flex-col gap-2">
      {!complete && (
        <Text variant="muted">
          Map every clip bone before applying. Incomplete maps never write a clip.
        </Text>
      )}
      {applyError && (
        <Text variant="error" className="break-words">
          {applyError}
        </Text>
      )}
      <div className="flex gap-2">
        <Button onClick={onCancel} variant="ghost" className="flex-1">
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!complete}
          variant="primary"
          className="flex-1"
        >
          Apply Retarget
        </Button>
      </div>
    </div>
  );
}
