import { useThree } from '@react-three/fiber';

import { useEffect } from 'react';
import { PICK_DRAG_THRESHOLD_PX } from '../constants/selection';
import { pickObjectAtPointer } from '../services/object-pick';
import { $editTool } from '../stores/edit-tool-store';
import { clearSelection, selectObject } from '../stores/selection-store';
import { useActiveModel } from './use-active-model';

export function useRaycastSelection(): void {
  const { scene } = useActiveModel();
  const gl = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera);
  const viewport = useThree((state) => state.size);

  useEffect(() => {
    clearSelection();
  }, [scene]);

  useEffect(() => {
    const canvas = gl.domElement;
    const dragOrigin = { x: 0, y: 0 };

    const onPointerDown = (event: PointerEvent) => {
      dragOrigin.x = event.clientX;
      dragOrigin.y = event.clientY;
    };

    const onPointerUp = (event: PointerEvent) => {
      if ($editTool.get() === 'move') {
        return;
      }

      const distance = Math.hypot(event.clientX - dragOrigin.x, event.clientY - dragOrigin.y);
      if (distance > PICK_DRAG_THRESHOLD_PX) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (
        pointer.x < 0
        || pointer.y < 0
        || pointer.x > viewport.width
        || pointer.y > viewport.height
      ) {
        return;
      }

      if (!scene) {
        clearSelection();
        return;
      }

      const picked = pickObjectAtPointer(scene, camera, pointer, viewport);
      selectObject(picked);
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);
    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
    };
  }, [gl, camera, viewport, scene]);
}
