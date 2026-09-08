export { ClipImport } from './components/clip-import';
export { ClipLibrary } from './components/clip-library';
export { ClipSelector } from './components/clip-selector';
export { ClipTrimInputs } from './components/clip-trim-inputs';
export { PlaybackControls } from './components/playback-controls';
export { SaveKeyframeButton } from './components/save-keyframe-button';
export { SpeedControl } from './components/speed-control';
export { useClipTimelineScrubber } from './hooks/use-clip-timeline-scrubber';
export {
  $clips,
  importClipFiles,
  MAX_TIME_SCALE,
  MIN_TIME_SCALE,
  pause,
  play,
  removeClip,
  replaceClip,
  saveKeyframe,
  selectClip,
  setTimeScale,
  stop,
  toggleLoop,
  trimClip,
} from './stores/clip-store';
