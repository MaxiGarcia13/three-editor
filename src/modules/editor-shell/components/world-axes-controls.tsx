import { useStore } from '@nanostores/react';
import { useState } from 'react';
import { Input } from '@/components/input/input';
import { Text } from '@/components/text';
import {
  $viewportSettings,
  setAxesSize,
  setAxesVisible,
} from '@/modules/viewport/stores/viewport-settings-store';

export function WorldAxesControls() {
  const { axesVisible, axesSize } = useStore($viewportSettings, {
    keys: ['axesVisible', 'axesSize'],
  });
  const [draft, setDraft] = useState(String(axesSize));

  const handleVisibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAxesVisible(event.target.checked);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDraft(value);
    if (value !== '') {
      setAxesSize(Number(value));
    }
  };

  const handleSizeBlur = () => {
    setDraft(String(axesSize));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 cursor-pointer shrink-0">
        <input
          type="checkbox"
          checked={axesVisible}
          onChange={handleVisibleChange}
          className="size-3.5 shrink-0 rounded-sm border-zinc-600 accent-sky-500"
        />
        <Text variant="muted">Show world axes</Text>
      </label>
      <Input
        label="Axes Length (m)"
        type="number"
        value={draft}
        min={1}
        max={50}
        step={0.1}
        onChange={handleSizeChange}
        onBlur={handleSizeBlur}
      />
    </div>
  );
}
