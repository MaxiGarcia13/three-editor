import { cn } from '@maxigarcia/js-utils';
import { useStore } from '@nanostores/react';
import { Button } from '@/components/button';
import { SaveIcon } from '@/components/icons/save-icon';
import { useActiveModel } from '@/modules/viewport/hooks/use-active-model';
import { $poseDirty } from '@/modules/viewport/stores/pose-edit-store';
import { $selection } from '@/modules/viewport/stores/selection-store';
import { $clips, saveKeyframe } from '../stores/clip-store';

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
    <div className={cn('pointer-events-auto', className)}>
      <Button
        variant="primary"
        onClick={saveKeyframe}
        aria-label="Save keyframe at current time"
        className="flex flex-row gap-2 items-center"
      >
        <SaveIcon />
        Save Keyframe at Current Time
      </Button>
    </div>
  );
}
