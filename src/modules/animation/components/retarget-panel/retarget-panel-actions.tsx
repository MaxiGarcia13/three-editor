import { Button } from '@/components/button';
import { Text } from '@/components/text';

interface RetargetPanelActionsProps {
  canApply: boolean;
  hasSkipped: boolean;
  applyError: string | null;
  onCancel: () => void;
  onSubmit: () => void;
}

export function RetargetPanelActions({
  canApply,
  hasSkipped,
  applyError,
  onCancel,
  onSubmit,
}: RetargetPanelActionsProps) {
  return (
    <div className="flex flex-col gap-2">
      {!canApply && (
        <Text variant="muted">
          Map at least one clip bone to apply. Unmapped bones are skipped
          (their tracks are dropped).
        </Text>
      )}
      {canApply && hasSkipped && (
        <Text variant="muted">
          Unmapped bones will be skipped — their tracks are dropped from the
          remapped clip.
        </Text>
      )}
      {applyError && (
        <Text variant="error" className="wrap-break-word">
          {applyError}
        </Text>
      )}
      <div className="flex gap-2">
        <Button onClick={onCancel} variant="ghost" className="flex-1">
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!canApply}
          variant="primary"
          className="flex-1"
        >
          Apply Retarget
        </Button>
      </div>
    </div>
  );
}
