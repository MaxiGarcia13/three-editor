import type { AnimationAction, AnimationMixer, Group } from 'three';
import { useStore } from '@nanostores/react';
import { useRef } from 'react';
import { $clips, isReadyClip } from '@/modules/animation/stores/clip-store';
import { useClipMixerAction } from './use-clip-mixer-action';
import { useClipMixerFrame } from './use-clip-mixer-frame';
import { useClipMixerMount } from './use-clip-mixer-mount';

export function useClipMixer(scene: Group | null): void {
  const mixerRef = useRef<AnimationMixer | null>(null);
  const actionRef = useRef<AnimationAction | null>(null);

  const { activeClipId, playing, loop, clips } = useStore($clips, {
    keys: ['activeClipId', 'playing', 'loop', 'clips'],
  });

  const entry = clips.find((item) => item.id === activeClipId);
  const clip = isReadyClip(entry) ? entry.clip : null;

  useClipMixerMount(scene, mixerRef, actionRef);
  useClipMixerAction(clip, playing, loop, mixerRef, actionRef, scene);
  useClipMixerFrame(mixerRef);
}
