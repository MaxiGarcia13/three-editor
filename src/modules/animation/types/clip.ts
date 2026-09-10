import type * as THREE from 'three';

export type ClipStatus = 'ready' | 'error' | 'draft';

export interface ClipEntry {
  id: string;
  name: string;
  sourceFile: string;
  clip: THREE.AnimationClip | null;
  sourceClip: THREE.AnimationClip | null;
  status: ClipStatus;
  error: string | null;
  /** Playback / export speed multiplier for this clip (default 1). */
  timeScale: number;
  /** Bone name → rest-pose local-position length captured from the source GLB. */
  sourceBindLengths: Record<string, number>;
}

export interface ClipLibraryState {
  clips: ClipEntry[];
  activeClipId: string | null;
  /** Primary layer snapshot captured when a blend partner is selected. */
  blendBaseClip: THREE.AnimationClip | null;
  blendClipId: string | null;
  blendWeight: number;
  playing: boolean;
  loop: boolean;
  duration: number;
  trimStart: number;
  trimEnd: number;
}

export interface ClipLoadResult {
  name: string;
  clips: THREE.AnimationClip[];
  /** Bone name → rest-pose local-position length from the source GLB. */
  sourceBindLengths: Record<string, number>;
}
