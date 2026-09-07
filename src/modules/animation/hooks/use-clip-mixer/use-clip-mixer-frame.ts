import type { RefObject } from 'react';
import type { AnimationMixer } from 'three';

import { useFrame } from '@react-three/fiber';

import { $clips, pause } from '@/modules/animation/stores/clip-store';

export function useClipMixerFrame(mixerRef: RefObject<AnimationMixer | null>): void {
  useFrame((_, delta) => {
    const mixer = mixerRef.current;
    if (!mixer) {
      return;
    }
    const state = $clips.get();
    if (!state.playing) {
      return;
    }
    mixer.update(delta);
    if (!state.loop && mixer.time >= state.duration) {
      pause();
    }
  });
}
