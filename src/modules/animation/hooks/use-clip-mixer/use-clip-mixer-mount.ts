import type { RefObject } from 'react';
import type { AnimationAction, Group } from 'three';

import { useEffect } from 'react';
import { AnimationMixer } from 'three';

import { setActiveMixer } from '@/modules/animation/services/mixer-session';
import { ensureRestPoseCaptured } from '@/modules/animation/services/rest-pose';
import { $clips, syncClipsToSkeleton } from '@/modules/animation/stores/clip-store';

export function useClipMixerMount(
  scene: Group | null,
  mixerRef: RefObject<AnimationMixer | null>,
  actionRef: RefObject<AnimationAction | null>,
  blendActionRef: RefObject<AnimationAction | null>,
): void {
  useEffect(() => {
    if (!scene) {
      syncClipsToSkeleton(null);
      setActiveMixer(null);
      return;
    }

    ensureRestPoseCaptured(scene);
    syncClipsToSkeleton(scene);

    const mixer = new AnimationMixer(scene);
    mixer.timeScale = $clips.get().timeScale;
    mixerRef.current = mixer;
    setActiveMixer(mixer);

    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(scene);
      mixerRef.current = null;
      actionRef.current = null;
      blendActionRef.current = null;
      setActiveMixer(null);
    };
  }, [scene, mixerRef, actionRef, blendActionRef]);
}
