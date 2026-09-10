import type { RefObject } from 'react';
import type { AnimationAction, AnimationClip, AnimationMixer, Group } from 'three';

import { useEffect } from 'react';

import { setBlendAction, setBlendWeight } from '@/modules/animation/utils/mixer-session';
import { applyLoopMode } from './apply-loop-mode';

export function useClipMixerBlend(
  blendClip: AnimationClip | null,
  blendWeight: number,
  loop: boolean,
  mixerRef: RefObject<AnimationMixer | null>,
  blendActionRef: RefObject<AnimationAction | null>,
  scene: Group | null,
): void {
  useEffect(() => {
    const mixer = mixerRef.current;
    if (!mixer) {
      return;
    }

    if (blendActionRef.current) {
      blendActionRef.current.stop();
      blendActionRef.current = null;
      setBlendAction(null);
    }

    if (!blendClip) {
      return;
    }

    const action = mixer.clipAction(blendClip);
    blendActionRef.current = action;
    setBlendAction(action);
    action.enabled = true;
    action.paused = false;
    action.play();
    // Snap both actions to the same playhead so the overlay starts in phase.
    mixer.setTime(mixer.time);
  }, [blendClip, scene, mixerRef, blendActionRef]);

  useEffect(() => {
    const action = blendActionRef.current;
    if (!action) {
      return;
    }
    applyLoopMode(action, loop);
  }, [loop, blendClip, scene, mixerRef, blendActionRef]);

  useEffect(() => {
    setBlendWeight(blendWeight);
  }, [blendWeight]);
}
