import type { KeyframeTrack } from 'three';

import { Quaternion, Vector3 } from 'three';

const _srcParent = new Quaternion();
const _tgtParent = new Quaternion();
const _tgtParentInv = new Quaternion();
const _sampleQ = new Quaternion();
const _worldQ = new Quaternion();
const _v = new Vector3();
const _sourceBind = new Vector3();
const _targetBind = new Vector3();

export interface HipsRebaseFrames {
  sourceParentWorldQuaternion: [number, number, number, number];
  targetParentWorldQuaternion: [number, number, number, number];
  sourceBindLocalPosition: [number, number, number];
  targetBindLocalPosition: [number, number, number];
}

function setQuat(
  target: Quaternion,
  tuple: [number, number, number, number],
): void {
  target.set(tuple[0], tuple[1], tuple[2], tuple[3]);
}

/**
 * Delta-from-bind hips positions:
 * `p' = targetBind + R_tgtParent⁻¹ * R_srcParent * ((p − sourceBind) * scale)`.
 */
export function rebaseHipsPositionTrack(
  track: KeyframeTrack,
  frames: HipsRebaseFrames,
  positionScale: number,
): void {
  setQuat(_srcParent, frames.sourceParentWorldQuaternion);
  setQuat(_tgtParent, frames.targetParentWorldQuaternion);
  _tgtParentInv.copy(_tgtParent).invert();
  _sourceBind.fromArray(frames.sourceBindLocalPosition);
  _targetBind.fromArray(frames.targetBindLocalPosition);

  const values = track.values;
  for (let i = 0; i < values.length; i += 3) {
    _v.set(values[i], values[i + 1], values[i + 2]);
    _v.sub(_sourceBind);
    if (positionScale !== 1) {
      _v.multiplyScalar(positionScale);
    }
    _v.applyQuaternion(_srcParent);
    _v.applyQuaternion(_tgtParentInv);
    _v.add(_targetBind);
    values[i] = _v.x;
    values[i + 1] = _v.y;
    values[i + 2] = _v.z;
  }
}

/**
 * Rebase hips local quaternions: `q' = R_tgtParent⁻¹ * R_srcParent * q`.
 */
export function rebaseHipsQuaternionTrack(
  track: KeyframeTrack,
  frames: HipsRebaseFrames,
): void {
  setQuat(_srcParent, frames.sourceParentWorldQuaternion);
  setQuat(_tgtParent, frames.targetParentWorldQuaternion);
  _tgtParentInv.copy(_tgtParent).invert();

  const values = track.values;
  for (let i = 0; i < values.length; i += 4) {
    _sampleQ.set(values[i], values[i + 1], values[i + 2], values[i + 3]);
    _worldQ.copy(_srcParent).multiply(_sampleQ);
    _sampleQ.copy(_tgtParentInv).multiply(_worldQ);
    values[i] = _sampleQ.x;
    values[i + 1] = _sampleQ.y;
    values[i + 2] = _sampleQ.z;
    values[i + 3] = _sampleQ.w;
  }
}
