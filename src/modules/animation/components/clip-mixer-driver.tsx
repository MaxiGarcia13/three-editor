import { useStore } from '@nanostores/react';
import { $model } from '@/modules/viewport/stores/model-store';
import { useClipMixer } from '../hooks/use-clip-mixer';

export function ClipMixerDriver() {
  const { scene } = useStore($model, { keys: ['scene'] });
  useClipMixer(scene);

  return null;
}
