import type * as THREE from 'three';

export type ClipStatus = 'ready' | 'error';

export interface ClipEntry {
  id: string;
  name: string;
  sourceFile: string;
  clip: THREE.AnimationClip | null;
  sourceClip: THREE.AnimationClip | null;
  status: ClipStatus;
  error: string | null;
}

export interface ClipLibraryState {
  clips: ClipEntry[];
  activeClipId: string | null;
  playing: boolean;
  loop: boolean;
  duration: number;
  trimStart: number;
  trimEnd: number;
  timeScale: number;
}

export interface ClipLoadResult {
  name: string;
  clips: THREE.AnimationClip[];
}
