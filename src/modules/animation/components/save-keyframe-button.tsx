import { cn } from '@maxigarcia/js-utils';
import { useStore } from '@nanostores/react';
import { Button } from '@/components/button';
import { RestoreIcon } from '@/components/icons/restore-icon';
import { SaveIcon } from '@/components/icons/save-icon';
import { useActiveModel } from '@/modules/viewport/hooks/use-active-model';
import { $editTool } from '@/modules/viewport/stores/edit-tool-store';
import { $poseDirty } from '@/modules/viewport/stores/pose-edit-store';
import { $clips, restorePose, saveKeyframe } from '../stores/clip-store';

interface SaveKeyframeButtonProps {
  className?: string;
}

export function SaveKeyframeButton({ className }: SaveKeyframeButtonProps) {
  const { activeClipId } = useStore($clips, { keys: ['activeClipId'] });
  const editTool = useStore($editTool);
  const poseDirty = useStore($poseDirty);
  const { scene } = useActiveModel();

  const isMove = editTool === 'move';
  const writeKeyframe = !isMove && activeClipId !== null;

  if (!poseDirty || scene === null) {
    return null;
  }

  return (
    <div className={cn('pointer-events-auto flex items-center gap-2', className)}>
      <Button
        variant="default"
        onClick={restorePose}
        aria-label="Restore edit"
        className="flex flex-row gap-2 items-center"
      >
        <RestoreIcon />
        Restore
      </Button>
      <Button
        variant="primary"
        onClick={saveKeyframe}
        aria-label={writeKeyframe ? 'Hold pose to end of clip' : 'Save edit'}
        title={
          writeKeyframe
            ? 'Keeps this pose from the playhead to the end of the clip. Scrub and edit again anytime to change it.'
            : 'Commits the current transform onto the model.'
        }
        className="flex flex-row gap-2 items-center"
      >
        <SaveIcon />
        {writeKeyframe ? 'Hold Pose to End' : 'Save'}
      </Button>
    </div>
  );
}
