import type { Object3D, SkinnedMesh } from 'three';
import type { BoneBindFrame } from '@/modules/animation/types/clip';

import { Bone, Quaternion } from 'three';

const _parentWorldQuat = new Quaternion();

function identityQuatTuple(): [number, number, number, number] {
  return [0, 0, 0, 1];
}

function quatTuple(q: Quaternion): [number, number, number, number] {
  return [q.x, q.y, q.z, q.w];
}

/**
 * Rest-pose parent world quaternions (bone name → frame) from a GLB scene.
 * Same bone set as `buildTargetBoneNames` / `captureBindLengths`.
 */
export function captureBindFrames(scene: Object3D): Record<string, BoneBindFrame> {
  scene.updateMatrixWorld(true);
  const frames: Record<string, BoneBindFrame> = {};

  const addBone = (bone: Bone) => {
    if (!bone.name || bone.name in frames) {
      return;
    }
    if (bone.parent) {
      bone.parent.getWorldQuaternion(_parentWorldQuat);
      frames[bone.name] = { parentWorldQuaternion: quatTuple(_parentWorldQuat) };
    } else {
      frames[bone.name] = { parentWorldQuaternion: identityQuatTuple() };
    }
  };

  scene.traverse((object) => {
    if (object instanceof Bone && object.name) {
      addBone(object);
    }

    const skinned = object as SkinnedMesh;
    if (skinned.isSkinnedMesh && skinned.skeleton) {
      for (const bone of skinned.skeleton.bones) {
        addBone(bone);
      }
    }
  });

  return frames;
}
