import { labelOffset } from './utils';

interface TimelineRulerProps {
  majorFrames: number[];
  totalFrames: number;
}

export function TimelineRuler({ majorFrames, totalFrames }: TimelineRulerProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-4">
      {majorFrames.map((frame) => (
        <span
          key={`label-${frame}`}
          className="absolute top-0.5 text-[10px] leading-none text-zinc-400 tabular-nums"
          style={{
            left: `${(frame / totalFrames) * 100}%`,
            transform: labelOffset(frame, totalFrames),
          }}
        >
          {frame}
        </span>
      ))}
    </div>
  );
}
