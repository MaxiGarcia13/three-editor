import { preserveGltfExtension } from '@/utils/glb-parse';

import { $clips } from '../store';

export function renameClip(id: string, name: string): void {
  const trimmed = name.trim();
  if (!trimmed) {
    return;
  }
  const state = $clips.get();
  const index = state.clips.findIndex((entry) => entry.id === id);
  if (index < 0) {
    return;
  }

  const clips = [...state.clips];
  const entry = clips[index];
  const nextName = preserveGltfExtension(trimmed, entry.name);
  let next = entry;
  if (entry.name !== nextName) {
    next = { ...entry, name: nextName };
  }
  const clip = next.clip;
  if (clip && clip.name !== nextName) {
    clip.name = nextName;
  }
  const sourceClip = next.sourceClip;
  if (sourceClip && sourceClip !== clip && sourceClip.name !== nextName) {
    sourceClip.name = nextName;
  }
  clips[index] = next;

  $clips.set({ ...state, clips });
}
