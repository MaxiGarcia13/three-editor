import type { RulerTick } from '@/modules/viewport/utils/axis-ruler';
import { BufferAttribute, BufferGeometry } from 'three';
import {
  AXES_MAJOR_TICK_LENGTH,
  AXES_MINOR_TICK_LENGTH,
} from '@/modules/viewport/constants/world-axes';

export type AxisId = 'x' | 'y';

export function tickLength(tick: RulerTick): number {
  return tick.major ? AXES_MAJOR_TICK_LENGTH : AXES_MINOR_TICK_LENGTH;
}

export function buildTickGeometry(axis: AxisId, ticks: RulerTick[]): BufferGeometry {
  const positions = new Float32Array(ticks.length * 6);

  ticks.forEach((tick, index) => {
    const length = tickLength(tick);
    const offset = index * 6;

    if (axis === 'x') {
      positions[offset] = tick.value;
      positions[offset + 1] = 0;
      positions[offset + 2] = 0;
      positions[offset + 3] = tick.value;
      positions[offset + 4] = -length;
      positions[offset + 5] = 0;
    } else {
      positions[offset] = 0;
      positions[offset + 1] = tick.value;
      positions[offset + 2] = 0;
      positions[offset + 3] = -length;
      positions[offset + 4] = tick.value;
      positions[offset + 5] = 0;
    }
  });

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  return geometry;
}
