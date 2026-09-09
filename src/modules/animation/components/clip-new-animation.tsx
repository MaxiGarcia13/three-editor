import { Button } from '@/components/button';
import { PlusIcon } from '@/components/icons/plus-icon';
import { useActiveModel } from '@/modules/viewport/hooks/use-active-model';
import { startNewAnimation } from '../stores/clip-store';

export function ClipNewAnimation() {
  const { scene } = useActiveModel();
  const enabled = scene !== null;

  return (
    <Button
      onClick={() => startNewAnimation(scene)}
      disabled={!enabled}
      variant="ghost"
      aria-label="New animation"
      title="New animation"
      className="p-1.5"
    >
      <PlusIcon />
    </Button>
  );
}
