import type { Group, Mesh } from 'three';
import { useStore } from '@nanostores/react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Box3, Vector3 } from 'three';

import {
  BONE_SELECTION_SPHERE_RADIUS,
  SELECTION_BOX_PADDING,
  SELECTION_HIGHLIGHT_COLOR,
} from '../constants/selection';
import { $selection } from '../stores/selection-store';

const scratchBox = new Box3();
const scratchCenter = new Vector3();
const scratchSize = new Vector3();
const scratchWorld = new Vector3();

export function SelectionHighlight() {
  const { object: selected } = useStore($selection, { keys: ['object'] });
  const markerRef = useRef<Group>(null);
  const boxRef = useRef<Mesh>(null);
  const sphereRef = useRef<Mesh>(null);

  useFrame(() => {
    const marker = markerRef.current;
    if (!marker) {
      return;
    }
    if (!selected) {
      marker.visible = false;
      return;
    }

    const box = boxRef.current;
    const sphere = sphereRef.current;
    const isMesh = (selected as { isMesh?: boolean }).isMesh === true;

    if (isMesh && box) {
      scratchBox.setFromObject(selected);
      scratchBox.getCenter(scratchCenter);
      scratchBox.getSize(scratchSize);
      if (scratchSize.lengthSq() === 0) {
        return;
      }
      marker.position.copy(scratchCenter);
      box.visible = true;
      box.scale.copy(scratchSize).multiplyScalar(SELECTION_BOX_PADDING);
      if (sphere) {
        sphere.visible = false;
      }
    } else if (sphere) {
      selected.getWorldPosition(scratchWorld);
      marker.position.copy(scratchWorld);
      sphere.visible = true;
      sphere.scale.setScalar(BONE_SELECTION_SPHERE_RADIUS);
      if (box) {
        box.visible = false;
      }
    } else {
      marker.visible = false;
      return;
    }

    marker.visible = true;
  });

  return (
    <group ref={markerRef} visible={false}>
      <mesh ref={boxRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial wireframe color={SELECTION_HIGHLIGHT_COLOR} />
      </mesh>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshBasicMaterial wireframe color={SELECTION_HIGHLIGHT_COLOR} />
      </mesh>
    </group>
  );
}
