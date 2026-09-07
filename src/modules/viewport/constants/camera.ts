import { Vector3 } from 'three';

/** Default OrbitControls look-at (mid-character height for a ~2 m figure). */
export const DEFAULT_CAMERA_TARGET = [0, 1, 0] as const;

/**
 * Default eye position — three-quarter elevated view matching the editor home framing.
 * Kept in sync with {@link DEFAULT_VIEW_OFFSET}.
 */
export const DEFAULT_CAMERA_POSITION = [3, 2, 4] as const;

export const DEFAULT_CAMERA_FOV = 50;

/** Unit direction from framing center to the default camera (same angle as DEFAULT_CAMERA_POSITION). */
export const DEFAULT_VIEW_OFFSET = new Vector3(...DEFAULT_CAMERA_POSITION).normalize();
