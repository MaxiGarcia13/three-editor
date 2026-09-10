import { cn } from '@maxigarcia/js-utils';
import { useStore } from '@nanostores/react';
import { Button } from '@/components/button';
import { EyeIcon } from '@/components/icons/eye-icon';
import { EyeOffIcon } from '@/components/icons/eye-off-icon';
import { $model, setActiveModel } from '@/modules/viewport/stores/model-store';

interface LibraryModelPreviewButtonProps {
  modelId: string;
  className?: string;
}

export function LibraryModelPreviewButton({ modelId, className }: LibraryModelPreviewButtonProps) {
  const { activeModelId } = useStore($model, { keys: ['activeModelId'] });
  const previewed = modelId === activeModelId;

  return (
    <Button
      onClick={() => setActiveModel(previewed ? null : modelId)}
      variant="ghost"
      aria-label={previewed ? 'Hide from preview' : 'Show in preview'}
      aria-pressed={previewed}
      title={previewed ? 'Hide from preview' : 'Show in preview'}
      className={cn(
        previewed && 'text-sky-500 hover:text-sky-400',
        className,
      )}
    >
      {previewed ? <EyeIcon /> : <EyeOffIcon />}
    </Button>
  );
}
