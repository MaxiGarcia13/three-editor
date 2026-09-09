import { remapClipTracks } from '@/modules/animation/services/clip-remap';
import { setMixerTime } from '@/modules/animation/services/mixer-session';
import { $clips } from '../store';

export function retargetClip(id: string, mapping: Map<string, string>): string | null {
  const state = $clips.get();
  const source = state.clips.find((entry) => entry.id === id);
  if (!source?.clip) {
    return null;
  }

  const result = remapClipTracks(source.clip, mapping);
  if (!result.clip || result.error) {
    return null;
  }

  const newEntry = {
    id: `${source.id}-retargeted`,
    name: result.clip.name,
    sourceFile: source.sourceFile,
    clip: result.clip,
    sourceClip: result.clip,
    status: 'ready' as const,
    error: null,
  };

  const clips = [...state.clips, newEntry];
  $clips.set({
    ...state,
    clips,
    activeClipId: newEntry.id,
    playing: false,
    duration: newEntry.clip.duration,
    trimStart: 0,
    trimEnd: newEntry.clip.duration,
  });

  setMixerTime(0);
  return newEntry.id;
}
