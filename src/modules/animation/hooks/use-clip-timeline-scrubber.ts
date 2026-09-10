import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';

import { $clips } from '../stores/clip-store';
import { setMixerTime } from '../utils/mixer-session';
import { readClipTimelineTime } from '../utils/to-timeline-time';

/** Domain wiring for the shared TimelineScrubber (mixer + clip store). */
export function useClipTimelineScrubber() {
  const { duration, playing, activeClipId, loop } = useStore($clips, {
    keys: ['duration', 'playing', 'activeClipId', 'loop'],
  });

  const [time, setTime] = useState(0);

  useEffect(() => {
    if (playing) {
      return;
    }
    setTime(readClipTimelineTime());
  }, [playing, activeClipId, loop, duration]);

  return {
    duration,
    time,
    playing,
    disabled: activeClipId === null || duration <= 0,
    getTime: readClipTimelineTime,
    onSeek: (nextTime: number) => {
      setMixerTime(nextTime);
      setTime(nextTime);
    },
  };
}
