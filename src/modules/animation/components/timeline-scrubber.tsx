import { useStore } from '@nanostores/react';
import { useEffect, useRef } from 'react';

import { getMixerTime, setMixerTime } from '../services/mixer-session';
import { $clips } from '../stores/clip-store';
import { formatTime } from '../utils/format-time';

function toTimelineTime(mixerTime: number, duration: number, loop: boolean): number {
  if (!Number.isFinite(mixerTime) || mixerTime < 0 || duration <= 0) {
    return 0;
  }
  if (loop) {
    return mixerTime % duration;
  }
  return Math.min(mixerTime, duration);
}

function readTimelineTime(): number {
  const { duration, loop } = $clips.get();
  return toTimelineTime(getMixerTime(), duration, loop);
}

export function TimelineScrubber() {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentLabelRef = useRef<HTMLSpanElement>(null);

  const { duration, playing, activeClipId, loop } = useStore($clips, {
    keys: ['duration', 'playing', 'activeClipId', 'loop'],
  });

  const enabled = activeClipId !== null && duration > 0;

  useEffect(() => {
    if (!inputRef.current || !currentLabelRef.current) {
      return;
    }
    inputRef.current.value = '0';
    currentLabelRef.current.textContent = formatTime(0);
  }, [duration]);

  useEffect(() => {
    if (playing) {
      return;
    }
    const time = readTimelineTime();
    if (inputRef.current) {
      inputRef.current.value = String(time);
    }
    if (currentLabelRef.current) {
      currentLabelRef.current.textContent = formatTime(time);
    }
  }, [playing, activeClipId, loop]);

  useEffect(() => {
    if (!playing) {
      return;
    }

    let rafId = 0;
    const tick = () => {
      const time = readTimelineTime();
      const input = inputRef.current;
      const label = currentLabelRef.current;
      if (input) {
        input.value = String(time);
      }
      if (label) {
        label.textContent = formatTime(time);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [playing]);

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(event.currentTarget.value);
    setMixerTime(time);
    if (currentLabelRef.current) {
      currentLabelRef.current.textContent = formatTime(time);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <input
        ref={inputRef}
        type="range"
        min={0}
        max={duration}
        step={0.01}
        defaultValue={0}
        disabled={!enabled}
        onChange={handleSeek}
        aria-label="Animation timeline"
        className="w-full accent-sky-500 disabled:opacity-40"
      />
      <div className="flex justify-between text-[10px] text-zinc-500">
        <span ref={currentLabelRef}>0:00.0</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
