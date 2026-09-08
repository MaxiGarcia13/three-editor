import type { ComponentRef } from 'react';

import type { OrbitControlsRef } from './model-framing';
import { useStore } from '@nanostores/react';
import { TransformControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { $selection } from '../stores/selection-store';

export type TransformControlsRef = ComponentRef<typeof TransformControls>;

interface DraggingChangedGizmo {
  addEventListener: (
    type: 'dragging-changed',
    listener: (event: { value: boolean }) => void,
  ) => void;
  removeEventListener: (
    type: 'dragging-changed',
    listener: (event: { value: boolean }) => void,
  ) => void;
}

export interface TransformControlsDriverProps {
  controlsRef: React.RefObject<OrbitControlsRef | null>;
}

export function TransformControlsDriver({ controlsRef }: TransformControlsDriverProps) {
  const { object: selected } = useStore($selection, { keys: ['object'] });
  const gizmoRef = useRef<TransformControlsRef>(null);

  useEffect(() => {
    const gizmo = gizmoRef.current as DraggingChangedGizmo | null;
    const orbit = controlsRef.current;
    if (!gizmo || !orbit) {
      return;
    }

    const onDraggingChanged = (event: { value: boolean }) => {
      orbit.enabled = !event.value;
    };

    gizmo.addEventListener('dragging-changed', onDraggingChanged);
    return () => {
      gizmo.removeEventListener('dragging-changed', onDraggingChanged);
      orbit.enabled = true;
    };
  }, [controlsRef, selected]);

  if (!selected) {
    return null;
  }

  return <TransformControls ref={gizmoRef} object={selected} />;
}
