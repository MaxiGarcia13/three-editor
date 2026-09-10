import { setMixerTime, setMixerTimeScale } from '@/modules/animation/utils/mixer-session';
import { $clips } from '../store';
import { nextClipId } from '../utils';
import { selectClip } from './select-clip';

/**
 * Clone an existing clip as an owned copy under a model.
 * The source clip stays unchanged; the clone gets a new id and ownerModelId.
 */
export function cloneClipAs(sourceId: string, ownerModelId: string): string | null {
  const state = $clips.get();
  const source = state.clips.find((entry) => entry.id === sourceId);
  if (!source?.clip) {
    return null;
  }

  const newId = nextClipId();
  const clone = {
    ...source,
    id: `${newId}-${source.name}`,
    clip: source.clip.clone(),
    sourceClip: source.sourceClip?.clone() ?? source.clip.clone(),
    ownerModelId,
  };

  const clips = [...state.clips, clone];
  const duration = clone.clip.duration;

  $clips.set({
    ...state,
    clips,
    activeClipId: clone.id,
    playing: false,
    duration,
    trimStart: 0,
    trimEnd: duration,
  });

  setMixerTime(0);
  setMixerTimeScale(clone.timeScale);
  selectClip(clone.id);

  return clone.id;
}
