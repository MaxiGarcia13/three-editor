import { ContactShadows, Grid } from '@react-three/drei';

import {
  GROUND_CELL_COLOR,
  GROUND_CELL_SIZE,
  GROUND_FADE_DISTANCE,
  GROUND_SECTION_COLOR,
  GROUND_SECTION_SIZE,
  GROUND_SHADOW_BLUR,
  GROUND_SHADOW_COLOR,
  GROUND_SHADOW_FAR,
  GROUND_SHADOW_OPACITY,
  GROUND_SHADOW_SCALE,
} from '../constants/ground-grid';

export function GroundGrid() {
  return (
    <group>
      <Grid
        infiniteGrid
        cellColor={GROUND_CELL_COLOR}
        cellSize={GROUND_CELL_SIZE}
        cellThickness={0.6}
        fadeDistance={GROUND_FADE_DISTANCE}
        fadeStrength={1}
        position={[0, 0, 0]}
        sectionColor={GROUND_SECTION_COLOR}
        sectionSize={GROUND_SECTION_SIZE}
        sectionThickness={1}
      />
      <ContactShadows
        blur={GROUND_SHADOW_BLUR}
        color={GROUND_SHADOW_COLOR}
        far={GROUND_SHADOW_FAR}
        opacity={GROUND_SHADOW_OPACITY}
        position={[0, 0.001, 0]}
        scale={GROUND_SHADOW_SCALE}
      />
    </group>
  );
}
