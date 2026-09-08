import {
  DEFAULT_MAJOR_FRAME_STEP,
  DEFAULT_TIMELINE_FPS,
} from './defaults';

export function timeToFrame(time: number, fps = DEFAULT_TIMELINE_FPS): number {
  if (!Number.isFinite(time) || time < 0) {
    return 0;
  }
  return Math.round(time * fps);
}

export function frameToTime(frame: number, fps = DEFAULT_TIMELINE_FPS): number {
  if (!Number.isFinite(frame) || frame < 0) {
    return 0;
  }
  return frame / fps;
}

export function durationToFrameCount(duration: number, fps = DEFAULT_TIMELINE_FPS): number {
  if (!Number.isFinite(duration) || duration <= 0) {
    return 1;
  }
  return Math.max(1, Math.ceil(duration * fps));
}

/** Pick a major step so labels stay readable at the current track width. */
export function resolveMajorFrameStep(
  totalFrames: number,
  trackWidthPx: number,
  baseStep = DEFAULT_MAJOR_FRAME_STEP,
): number {
  if (totalFrames <= 0) {
    return baseStep;
  }

  const minLabelPx = 40;
  let step = baseStep;
  while ((trackWidthPx / totalFrames) * step < minLabelPx) {
    step *= 2;
    if (step > totalFrames) {
      return Math.max(baseStep, totalFrames);
    }
  }
  return step;
}
