import type { AxesHelper } from 'three';
import type { RulerTick } from '../utils/axis-ruler';
import { Billboard, Text } from '@react-three/drei';
import { useLayoutEffect, useRef } from 'react';

import { BufferAttribute, BufferGeometry, Color } from 'three';
import {
  AXES_COLORS,
  AXES_LABEL_COLOR,
  AXES_LABEL_GAP,
  AXES_MAJOR_LABEL_FONT_SIZE,
  AXES_MAJOR_STEP,
  AXES_MAJOR_TICK_LENGTH,
  AXES_MINOR_LABEL_FONT_SIZE,
  AXES_MINOR_STEP,
  AXES_MINOR_TICK_LENGTH,
  AXES_SIZE,
} from '../constants/world-axes';
import {
  buildRulerTicks,
  formatRulerLabel,

} from '../utils/axis-ruler';

type AxisId = 'x' | 'y';

const RULER_TICKS = buildRulerTicks(AXES_SIZE, AXES_MAJOR_STEP, AXES_MINOR_STEP);

function tickLength(tick: RulerTick): number {
  return tick.major ? AXES_MAJOR_TICK_LENGTH : AXES_MINOR_TICK_LENGTH;
}

function buildTickGeometry(axis: AxisId, ticks: RulerTick[]): BufferGeometry {
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

const X_TICK_GEOMETRY = buildTickGeometry('x', RULER_TICKS);
const Y_TICK_GEOMETRY = buildTickGeometry('y', RULER_TICKS);

function AxisRulerLabels({ axis }: { axis: AxisId }) {
  return (
    <group>
      {RULER_TICKS.map((tick) => {
        const length = tickLength(tick);
        const fontSize = tick.major
          ? AXES_MAJOR_LABEL_FONT_SIZE
          : AXES_MINOR_LABEL_FONT_SIZE;
        const labelOffset = length + AXES_LABEL_GAP;
        const position: [number, number, number]
          = axis === 'x'
            ? [tick.value, -labelOffset, 0]
            : [-labelOffset, tick.value, 0];

        return (
          <Billboard key={`${axis}-${tick.value}`} position={position}>
            <Text
              anchorX={axis === 'x' ? 'center' : 'right'}
              anchorY={axis === 'x' ? 'top' : 'middle'}
              color={AXES_LABEL_COLOR}
              fontSize={fontSize}
            >
              {formatRulerLabel(tick)}
            </Text>
          </Billboard>
        );
      })}
    </group>
  );
}

export function WorldAxes() {
  const ref = useRef<AxesHelper>(null);

  useLayoutEffect(() => {
    const helper = ref.current;
    if (!helper) {
      return;
    }

    const colors = helper.geometry.getAttribute('color');
    const array = colors.array as Float32Array;
    const x = new Color(AXES_COLORS.x);
    const y = new Color(AXES_COLORS.y);
    const z = new Color(AXES_COLORS.z);

    // AxesHelper: 6 vertices — origin/+X, origin/+Y, origin/+Z (2 per axis).
    x.toArray(array, 0);
    x.toArray(array, 3);
    y.toArray(array, 6);
    y.toArray(array, 9);
    z.toArray(array, 12);
    z.toArray(array, 15);
    colors.needsUpdate = true;
  }, []);

  return (
    <group>
      <axesHelper ref={ref} args={[AXES_SIZE]} />
      <lineSegments geometry={X_TICK_GEOMETRY}>
        <lineBasicMaterial color={AXES_LABEL_COLOR} />
      </lineSegments>
      <lineSegments geometry={Y_TICK_GEOMETRY}>
        <lineBasicMaterial color={AXES_LABEL_COLOR} />
      </lineSegments>
      <AxisRulerLabels axis="x" />
      <AxisRulerLabels axis="y" />
    </group>
  );
}
