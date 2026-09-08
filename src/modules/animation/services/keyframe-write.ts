import type { AnimationClip, KeyframeTrack } from 'three';

import { QuaternionKeyframeTrack, VectorKeyframeTrack } from 'three';

export interface NodeTRS {
  position: [number, number, number];
  quaternion: [number, number, number, number];
  scale: [number, number, number];
}

function lowerBoundIndex(times: Float32Array, time: number): number {
  let low = 0;
  let high = times.length;
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (times[mid] < time) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}

function upsertKeyframe(track: KeyframeTrack, time: number, sample: readonly number[]): KeyframeTrack {
  const valueSize = track.getValueSize();
  const times = track.times;
  const values = track.values;
  const index = lowerBoundIndex(times, time);

  if (index < times.length && times[index] === time) {
    const offset = index * valueSize;
    for (let i = 0; i < valueSize; i++) {
      values[offset + i] = sample[i];
    }
    return track;
  }

  const newTimes = new Float32Array(times.length + 1);
  const newValues = new Float32Array(values.length + valueSize);
  newTimes.set(times.subarray(0, index));
  newTimes[index] = time;
  newTimes.set(times.subarray(index), index + 1);
  newValues.set(values.subarray(0, index * valueSize));
  newValues.set(sample, index * valueSize);
  newValues.set(values.subarray(index * valueSize), (index + 1) * valueSize);
  track.times = newTimes;
  track.values = newValues;
  return track;
}

function upsertTrackData(
  clip: AnimationClip,
  name: string,
  time: number,
  sample: readonly number[],
  valueSize: number,
): void {
  const existing = clip.tracks.find((track) => track.name === name);
  if (existing) {
    upsertKeyframe(existing, time, sample);
    return;
  }

  const TrackConstructor = valueSize === 4 ? QuaternionKeyframeTrack : VectorKeyframeTrack;
  clip.tracks.push(new TrackConstructor(name, [time], [...sample]));
}

export function writeNodeKeyframe(
  clip: AnimationClip,
  nodeName: string,
  time: number,
  trs: NodeTRS,
): AnimationClip {
  const keyTime = Math.fround(time);
  const working = clip.clone();
  upsertTrackData(working, `${nodeName}.position`, keyTime, trs.position, 3);
  upsertTrackData(working, `${nodeName}.quaternion`, keyTime, trs.quaternion, 4);
  upsertTrackData(working, `${nodeName}.scale`, keyTime, trs.scale, 3);
  working.duration = clip.duration;
  return working;
}
