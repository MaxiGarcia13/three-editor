import { cn } from '@maxigarcia/js-utils';
import { useStore } from '@nanostores/react';
import { Button } from '@/components/button';
import { useTransformModeHotkeys } from '../hooks/use-transform-mode-hotkeys';
import { $selection } from '../stores/selection-store';
import {
  $transformMode,
  setTransformMode,
  type TransformMode,
} from '../stores/transform-mode-store';

const MODES: { mode: TransformMode; label: string; hotkey: string }[] = [
  { mode: 'translate', label: 'Move', hotkey: 'W' },
  { mode: 'rotate', label: 'Rotate', hotkey: 'E' },
  { mode: 'scale', label: 'Scale', hotkey: 'R' },
];

interface TransformModeToolbarProps {
  className?: string;
}

export function TransformModeToolbar({ className }: TransformModeToolbarProps) {
  useTransformModeHotkeys();

  const { object: selected } = useStore($selection, { keys: ['object'] });
  const mode = useStore($transformMode);

  if (!selected) {
    return null;
  }

  return (
    <div
      role="toolbar"
      aria-label="Transform mode"
      className={cn('pointer-events-auto flex items-center gap-1 rounded bg-zinc-800/90 p-1', className)}
    >
      {MODES.map(({ mode: nextMode, label, hotkey }) => {
        const active = mode === nextMode;
        return (
          <Button
            key={nextMode}
            variant={active ? 'primary' : 'ghost'}
            aria-label={`${label} (${hotkey})`}
            aria-pressed={active}
            title={`${label} (${hotkey})`}
            onClick={() => setTransformMode(nextMode)}
            className="min-w-16"
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
