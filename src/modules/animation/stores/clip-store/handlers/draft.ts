import type { Object3D } from 'three';

import type { ClipEntry } from '@/modules/animation/types/clip';
import { setMixerTime } from '@/modules/animation/services/mixer-session';
import { $clips } from '../store';
import { nextClipId, toBlankDraftEntry } from '../utils';

function nextDraftName(existing: ClipEntry[]): string {
  const used = new Set(existing.map((entry) => entry.name));
  let n = existing.length + 1;

  while (used.has(`New animation ${n}`)) {
    n += 1;
  }

  return `New animation ${n}`;
}

/** New writing target only: appends a blank draft and selects it for authoring. */
export function startNewAnimation(scene: Object3D | null): string | null {
  if (!scene) {
    return null;
  }

  const state = $clips.get();
  const id = nextClipId();
  const entry = toBlankDraftEntry(id, nextDraftName(state.clips));

  $clips.set({
    ...state,
    clips: [...state.clips, entry],
    activeClipId: id,
    blendClipId: null,
    blendWeight: 0,
    playing: false,
    duration: 0,
    trimStart: 0,
    trimEnd: 0,
  });
  setMixerTime(0);

  return id;
}
