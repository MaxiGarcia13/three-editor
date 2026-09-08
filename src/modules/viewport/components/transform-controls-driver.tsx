import type { ComponentRef } from 'react';

import type { OrbitControlsRef } from './model-framing';
import { useStore } from '@nanostores/react';
import { TransformControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { markPoseDirty } from '../stores/pose-edit-store';
import { $selection } from '../stores/selection-store';

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
  const gizmoRef = useRef<TransformControlsRef>(null);

  useEffect(() => {
    const gizmo = gizmoRef.current as TransformControlsEvents | null;
    const orbit = controlsRef.current;
    if (!gizmo || !orbit) {
      return;
    }

    const onDraggingChanged = (event: { value?: boolean }) => {
      orbit.enabled = !event.value;
    };

    const onObjectChange = () => {
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

  return <TransformControls ref={gizmoRef} object={selected} />;
}
