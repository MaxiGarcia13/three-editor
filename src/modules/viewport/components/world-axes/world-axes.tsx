import type { AxesHelper } from 'three';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { Color } from 'three';
import {
  AXES_COLORS,
  AXES_LABEL_COLOR,
  AXES_MAJOR_STEP,
  AXES_MINOR_STEP,
} from '@/modules/viewport/constants/world-axes';
import { buildRulerTicks } from '@/modules/viewport/utils/axis-ruler';
import { AxisRulerLabels } from './axis-ruler-labels';
import { buildTickGeometry } from './tick-geometry';

export function WorldAxes({ axesSize }: { axesSize: number }) {
  const ref = useRef<AxesHelper>(null);

  const rulerTicks = useMemo(
    () => buildRulerTicks(axesSize, AXES_MAJOR_STEP, AXES_MINOR_STEP),
    [axesSize],
  );

  const xTickGeometry = useMemo(
    () => buildTickGeometry('x', rulerTicks),
    [rulerTicks],
  );

  const yTickGeometry = useMemo(
    () => buildTickGeometry('y', rulerTicks),
    [rulerTicks],
  );

  useLayoutEffect(() => {
    return () => {
      xTickGeometry.dispose();
      yTickGeometry.dispose();
    };
  }, [xTickGeometry, yTickGeometry]);

  // Re-run when axesSize changes: drei recreates AxesHelper from args, resetting to RGB defaults.
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

    x.toArray(array, 0);
    x.toArray(array, 3);
    y.toArray(array, 6);
    y.toArray(array, 9);
    z.toArray(array, 12);
    z.toArray(array, 15);
    colors.needsUpdate = true;
  }, [axesSize]);

  return (
    <group>
      <axesHelper ref={ref} args={[axesSize]} />
      <lineSegments geometry={xTickGeometry}>
        <lineBasicMaterial color={AXES_LABEL_COLOR} />
      </lineSegments>
      <lineSegments geometry={yTickGeometry}>
        <lineBasicMaterial color={AXES_LABEL_COLOR} />
      </lineSegments>
      <AxisRulerLabels axis="x" ticks={rulerTicks} />
      <AxisRulerLabels axis="y" ticks={rulerTicks} />
    </group>
  );
}
