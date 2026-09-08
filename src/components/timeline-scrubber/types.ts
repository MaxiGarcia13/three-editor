export interface TimelineScrubberProps {
  /** Clip length in seconds. */
  'duration': number;
  /** Current time in seconds (used when not playing / not dragging). */
  'time': number;
  /** When true, polls `getTime` each animation frame. */
  'playing'?: boolean;
  'disabled'?: boolean;
  /** Hot-path clock read while playing (avoids React re-renders). */
  'getTime'?: () => number;
  'onSeek': (time: number) => void;
  'fps'?: number;
  'majorFrameStep'?: number;
  'minPxPerFrame'?: number;
  'className'?: string;
  'aria-label'?: string;
}
