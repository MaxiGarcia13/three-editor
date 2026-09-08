import type { ComponentRef } from 'react';

import type { OrbitControlsRef } from './model-framing';
import { useStore } from '@nanostores/react';
import { TransformControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import {
  resumeMixerBindings,
  suspendMixerBindings,
} from '@/modules/animation/services/mixer-session';
import { pause } from '@/modules/animation/stores/clip-store';
import { $poseDirty, markPoseDirty } from '../stores/pose-edit-store';
import { $selection } from '../stores/selection-store';
import { $transformMode } from '../stores/transform-mode-store';

export type TransformControlsRef = ComponentRef<typeof TransformControls>;

interface TransformControlsEvents {
  addEventListener: (type: 'dragging-changed' | 'objectChange', listener: (event: { value?: boolean }) => void) => void;
  removeEventListener: (type: 'dragging-changed' | 'objectChange', listener: (event: { value?: boolean }) => void) => void;
}

export interface TransformControlsDriverProps {
  controlsRef: React.RefObject<OrbitControlsRef | null>;
}

export function TransformControlsDriver({ controlsRef }: TransformControlsDriverProps) {
  const { object: selected } = useStore($selection, { keys: ['object'] });
  const mode = useStore($transformMode);
  const gizmoRef = useRef<TransformControlsRef>(null);

  useEffect(() => {
    const gizmo = gizmoRef.current as TransformControlsEvents | null;
    const orbit = controlsRef.current;
    if (!gizmo || !orbit) {
      return;
    }

    const onDraggingChanged = (event: { value?: boolean }) => {
      const dragging = Boolean(event.value);
      orbit.enabled = !dragging;
      if (dragging) {
        pause();
        suspendMixerBindings();
      } else if (!$poseDirty.get()) {
        resumeMixerBindings();
      }
    };

    const onObjectChange = () => {
      suspendMixerBindings();
      markPoseDirty();
    };

    gizmo.addEventListener('dragging-changed', onDraggingChanged);
    gizmo.addEventListener('objectChange', onObjectChange);
    return () => {
      gizmo.removeEventListener('dragging-changed', onDraggingChanged);
      gizmo.removeEventListener('objectChange', onObjectChange);
      orbit.enabled = true;
    };
  }, [controlsRef, selected]);

  if (!selected) {
    return null;
  }

  // Local space: bone/mesh keyframes store local TRS; world rotate fights parent joints.
  return <TransformControls ref={gizmoRef} object={selected} mode={mode} space="local" />;
}
