import type { RefObject } from 'react';
import type { AnimationAction, AnimationClip, AnimationMixer, Group } from 'three';

import { useEffect } from 'react';

import { applyLoopMode } from './apply-loop-mode';

export function useClipMixerAction(
  clip: AnimationClip | null,
  playing: boolean,
  loop: boolean,
  mixerRef: RefObject<AnimationMixer | null>,
  actionRef: RefObject<AnimationAction | null>,
  scene: Group | null,
): void {
  useEffect(() => {
    const mixer = mixerRef.current;
    if (!mixer) {
      return;
    }

    if (actionRef.current) {
      actionRef.current.stop();
      actionRef.current = null;
    }

    if (!clip) {
      mixer.setTime(0);
      return;
    }

    const action = mixer.clipAction(clip);
    actionRef.current = action;
    mixer.setTime(0);
  }, [clip, scene, mixerRef, actionRef]);

  useEffect(() => {
    const action = actionRef.current;
    const mixer = mixerRef.current;
    if (!action || !mixer) {
      return;
    }

    applyLoopMode(action, loop);

    if (!playing) {
      action.paused = true;
      return;
    }

    const duration = action.getClip().duration;
    if (duration > 0 && mixer.time >= duration) {
      action.reset();
      mixer.setTime(0);
    } else if (mixer.time <= 1e-6) {
      action.reset();
    }
    action.paused = false;
    action.play();
  }, [playing, loop, clip, scene, mixerRef, actionRef]);
}
