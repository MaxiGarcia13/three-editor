import { cn } from '@maxigarcia/js-utils';
import { useStore } from '@nanostores/react';
import { Button } from '@/components/button';
import { PauseIcon } from '@/components/icons/pause-icon';
import { PlayIcon } from '@/components/icons/play-icon';
import { RepeatIcon } from '@/components/icons/repeat-icon';
import { StopIcon } from '@/components/icons/stop-icon';
import { useActiveModel } from '@/modules/viewport/hooks/use-active-model';
import { $clips, pause, play, stop, toggleLoop } from '../stores/clip-store';

interface PlaybackControlsProps {
  className?: string;
}

export function PlaybackControls({ className }: PlaybackControlsProps) {
  const { playing, loop, activeClipId } = useStore($clips, {
    keys: ['playing', 'loop', 'activeClipId'],
  });
  const { scene } = useActiveModel();

  const enabled = scene !== null && activeClipId !== null;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Button
        onClick={playing ? pause : play}
        disabled={!enabled}
        aria-label={playing ? 'Pause' : 'Play'}
        aria-pressed={playing}
        className="flex-1 flex items-center justify-center gap-2 max-w-20"
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
        <span className="text-xs">{playing ? 'Pause' : 'Play'}</span>
      </Button>
      <Button
        onClick={stop}
        disabled={!enabled}
        aria-label="Stop"
        className="flex-1 flex items-center justify-center gap-2 max-w-20"
      >
        <StopIcon />
        <span className="text-xs">Stop</span>
      </Button>
      <Button
        onClick={toggleLoop}
        disabled={!enabled}
        aria-label="Toggle loop"
        aria-pressed={loop}
        variant="ghost"
        className={`flex-1 flex items-center justify-center gap-2 max-w-20${loop ? 'text-sky-400' : ''}`}
      >
        <RepeatIcon />
        <span className="text-xs">{loop ? 'Loop' : 'Once'}</span>
      </Button>
    </div>
  );
}
