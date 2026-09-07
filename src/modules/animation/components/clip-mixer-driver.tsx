import { useActiveModel } from '@/modules/viewport/hooks/use-active-model';
import { useClipMixer } from '../hooks/use-clip-mixer';

export function ClipMixerDriver() {
  const { scene } = useActiveModel();
  useClipMixer(scene);

  return null;
}
