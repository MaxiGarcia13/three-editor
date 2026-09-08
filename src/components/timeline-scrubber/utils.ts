export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

const MAX_MINOR_MARKS = 240;

export function buildFrameMarks(
  totalFrames: number,
  majorStep: number,
  minorStep: number,
): { majorFrames: number[]; minorFrames: number[] } {
  const majorFrames: number[] = [];
  for (let frame = majorStep; frame < totalFrames; frame += majorStep) {
    majorFrames.push(frame);
  }

  const minorFrames: number[] = [];
  if (totalFrames / minorStep <= MAX_MINOR_MARKS) {
    for (let frame = minorStep; frame < totalFrames; frame += minorStep) {
      if (frame % majorStep !== 0) {
        minorFrames.push(frame);
      }
    }
  }

  return { majorFrames, minorFrames };
}

export function labelOffset(frame: number, totalFrames: number): string {
  if (frame === 0) {
    return 'translateX(0)';
  }
  if (frame === totalFrames) {
    return 'translateX(-100%)';
  }
  return 'translateX(-50%)';
}
