/** World-space length of the XYZ axes (GLTF units; metres). */
export const AXES_SIZE = 10;

/** Major ruler step (labelled `Nm`). */
export const AXES_MAJOR_STEP = 1;

/** Minor ruler step (labelled `N.NN`). */
export const AXES_MINOR_STEP = 0.1;

/** Tick length perpendicular to the axis (major / minor). */
export const AXES_MAJOR_TICK_LENGTH = 0.14;
export const AXES_MINOR_TICK_LENGTH = 0.07;

/** World-space font sizes for ruler labels. */
export const AXES_MAJOR_LABEL_FONT_SIZE = 0.12;
export const AXES_MINOR_LABEL_FONT_SIZE = 0.025;

/** Gap from tick tip to label. */
export const AXES_LABEL_GAP = 0.04;

/** Axis line colors (X / Y / Z). */
export const AXES_COLORS = {
  x: '#3f3f47',
  y: '#3f3f47',
  z: '#3f3f47',
} as const;

/** Ruler tick + label color. */
export const AXES_LABEL_COLOR = '#71717a';
