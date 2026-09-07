export interface RulerTick {
  value: number;
  major: boolean;
}

function nearlyMultiple(value: number, step: number): boolean {
  const quotient = value / step;
  return Math.abs(quotient - Math.round(quotient)) < 1e-6;
}

/** Build ascending ruler ticks from `minorStep` through `size` (metres). */
export function buildRulerTicks(
  size: number,
  majorStep: number,
  minorStep: number,
): RulerTick[] {
  const ticks: RulerTick[] = [];
  const steps = Math.round(size / minorStep);

  for (let index = 1; index <= steps; index += 1) {
    const value = Number((index * minorStep).toFixed(10));
    if (value > size + 1e-9) {
      break;
    }
    ticks.push({
      value,
      major: nearlyMultiple(value, majorStep),
    });
  }

  return ticks;
}

export function formatRulerLabel(tick: RulerTick): string {
  if (tick.major) {
    return `${Math.round(tick.value)}m`;
  }
  return tick.value.toFixed(2);
}
