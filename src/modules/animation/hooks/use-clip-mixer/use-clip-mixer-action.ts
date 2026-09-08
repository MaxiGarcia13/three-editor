import type { RefObject } from 'react';
import type { AnimationAction, AnimationClip, AnimationMixer, Group } from 'three';

import { useEffect } from 'react';

import { $clips } from '@/modules/animation/stores/clip-store/store';
import { toTimelineTime } from '@/modules/animation/utils/to-timeline-time';
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

    const previousTime = mixer.time;

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
    // Keep action unpaused: AnimationMixer.setTime does not advance paused actions,
    // and scrubbing uses setMixerTime. App pause is gated in useClipMixerFrame.
    action.paused = false;
    action.play();
    mixer.setTime(toTimelineTime(previousTime, clip.duration, $clips.get().loop));
  }, [clip, scene, mixerRef, actionRef]);

  useEffect(() => {
    const action = actionRef.current;
    const mixer = mixerRef.current;
    if (!action || !mixer) {
      return;
    }

    applyLoopMode(action, loop);
    action.paused = false;
    action.play();

    if (!playing) {
      return;
    }

    const duration = action.getClip().duration;
    if (duration > 0 && mixer.time >= duration) {
      action.reset();
      mixer.setTime(0);
    } else if (mixer.time <= 1e-6) {
      action.reset();
    }
  }, [playing, loop, clip, scene, mixerRef, actionRef]);
}
