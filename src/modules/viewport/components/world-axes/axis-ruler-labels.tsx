import type { AxisId } from './tick-geometry';
import type { RulerTick } from '@/modules/viewport/utils/axis-ruler';
import { Billboard, Text } from '@react-three/drei';
import {
  AXES_LABEL_COLOR,
  AXES_LABEL_GAP,
  AXES_MAJOR_LABEL_FONT_SIZE,
  AXES_MINOR_LABEL_FONT_SIZE,
} from '@/modules/viewport/constants/world-axes';
import { formatRulerLabel } from '@/modules/viewport/utils/axis-ruler';
import { tickLength } from './tick-geometry';

export function AxisRulerLabels({ axis, ticks }: { axis: AxisId; ticks: RulerTick[] }) {
  return (
    <group>
      {ticks.map((tick) => {
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
