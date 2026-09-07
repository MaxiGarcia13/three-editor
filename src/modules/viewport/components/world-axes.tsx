import type { AxesHelper } from 'three';
import { useLayoutEffect, useRef } from 'react';
import { Color } from 'three';

import { AXES_COLORS, AXES_SIZE } from '../constants/world-axes';

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

  return <axesHelper ref={ref} args={[AXES_SIZE]} />;
}
