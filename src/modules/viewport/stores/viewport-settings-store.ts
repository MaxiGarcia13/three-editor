import { map } from 'nanostores';
import { AXES_SIZE } from '../constants/world-axes';

const AXES_SIZE_MIN = 1;
const AXES_SIZE_MAX = 50;

export interface ViewportSettingsState {
  axesVisible: boolean;
  axesSize: number;
}

export const $viewportSettings = map<ViewportSettingsState>({
  axesVisible: false,
  axesSize: AXES_SIZE,
});

export function setAxesVisible(visible: boolean): void {
  $viewportSettings.setKey('axesVisible', visible);
}

export function setAxesSize(size: number): void {
  $viewportSettings.setKey('axesSize', Math.min(AXES_SIZE_MAX, Math.max(AXES_SIZE_MIN, size)));
}
