import { cn } from '@maxigarcia/js-utils';
import { useStore } from '@nanostores/react';
import { Button } from '@/components/button';
import { RestoreIcon } from '@/components/icons/restore-icon';
import { SaveIcon } from '@/components/icons/save-icon';
import { useActiveModel } from '@/modules/viewport/hooks/use-active-model';
import { $poseDirty } from '@/modules/viewport/stores/pose-edit-store';
import { $selection } from '@/modules/viewport/stores/selection-store';
import { $clips, restorePose, saveKeyframe } from '../stores/clip-store';

interface SaveKeyframeButtonProps {
  className?: string;
}

export function SaveKeyframeButton({ className }: SaveKeyframeButtonProps) {
  const { activeClipId } = useStore($clips, { keys: ['activeClipId'] });
  const { object: selected } = useStore($selection, { keys: ['object'] });
  const poseDirty = useStore($poseDirty);
  const { scene } = useActiveModel();

  const visible = poseDirty && scene !== null && activeClipId !== null && selected !== null;
  if (!visible) {
    return null;
  }

  return (
    <div className={cn('pointer-events-auto flex items-center gap-2', className)}>
      <Button
        variant="default"
        onClick={restorePose}
        aria-label="Restore pose"
        className="flex flex-row gap-2 items-center"
      >
        <RestoreIcon />
        Restore Pose
      </Button>
      <Button
        variant="primary"
        onClick={saveKeyframe}
        aria-label="Hold pose to end of clip"
        title="Keeps this pose from the playhead to the end of the clip. Scrub and edit again anytime to change it."
        className="flex flex-row gap-2 items-center"
      >
        <SaveIcon />
        Hold Pose to End
      </Button>
    </div>
  );
}
