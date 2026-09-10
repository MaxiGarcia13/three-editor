import type { RefObject } from 'react';
import type { AnimationAction, Group } from 'three';

import { useEffect } from 'react';
import { AnimationMixer } from 'three';

import { ensureRestPoseCaptured } from '@/modules/animation/domain/rest-pose';
import { $clips, syncClipsToSkeleton } from '@/modules/animation/stores/clip-store';
import { setActiveMixer } from '@/modules/animation/utils/mixer-session';

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
    const active = $clips.get().clips.find((entry) => entry.id === $clips.get().activeClipId);
    mixer.timeScale = active?.timeScale ?? 1;
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
