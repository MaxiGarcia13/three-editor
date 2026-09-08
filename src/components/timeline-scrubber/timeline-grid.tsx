interface TimelineGridProps {
  majorFrames: number[];
  minorFrames: number[];
  totalFrames: number;
}

export function TimelineGrid({ majorFrames, minorFrames, totalFrames }: TimelineGridProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-4 bottom-0 border-t border-zinc-700/80">
      {minorFrames.map((frame) => (
        <span
          key={`minor-${frame}`}
          className="absolute top-0 h-full w-px bg-zinc-800"
          style={{ left: `${(frame / totalFrames) * 100}%` }}
        />
      ))}
      {majorFrames.map((frame) => (
        <span
          key={`major-${frame}`}
          className="absolute top-0 h-full w-px bg-zinc-600/80"
          style={{ left: `${(frame / totalFrames) * 100}%` }}
        >
          <span className="absolute top-0 left-0 h-1.5 w-px bg-zinc-400" />
        </span>
      ))}
      <span className="absolute top-0 left-0 h-full w-px bg-zinc-600/80">
        <span className="absolute top-0 left-0 h-1.5 w-px bg-zinc-400" />
      </span>
      <span className="absolute top-0 right-0 h-full w-px bg-zinc-600/80">
        <span className="absolute top-0 left-0 h-1.5 w-px bg-zinc-400" />
      </span>
    </div>
  );
}
