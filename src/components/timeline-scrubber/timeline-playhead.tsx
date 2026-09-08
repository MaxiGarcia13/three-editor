import type { RefObject } from 'react';

interface TimelinePlayheadProps {
  playheadRef: RefObject<HTMLDivElement | null>;
  frameLabelRef: RefObject<HTMLSpanElement | null>;
}

export function TimelinePlayhead({ playheadRef, frameLabelRef }: TimelinePlayheadProps) {
  return (
    <div
      ref={playheadRef}
      className="pointer-events-none absolute top-0 bottom-0 z-10 w-0"
      style={{ left: '0%' }}
    >
      <div className="absolute top-0 left-1/2 flex -translate-x-1/2 flex-col items-center">
        <span className="rounded-sm bg-sky-500 px-1.5 py-0.5 text-xs font-medium leading-none text-white tabular-nums">
          <span ref={frameLabelRef}>1</span>
        </span>
        <span className="h-0 w-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-sky-500" />
      </div>
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-sky-500" />
    </div>
  );
}
