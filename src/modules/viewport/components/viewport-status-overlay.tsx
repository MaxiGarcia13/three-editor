import { useStore } from '@nanostores/react';
import { Text } from '@/components/text';
import { $model } from '@/modules/viewport/stores/model-store';

export function ViewportStatusOverlay() {
  const { phase, error } = useStore($model, { keys: ['phase', 'error'] });

  if (phase === 'loaded') {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
      {phase === 'loading' && (
        <Text size="sm" variant="muted">
          Loading model…
        </Text>
      )}
      {phase === 'error' && error && (
        <Text size="sm" variant="error" className="max-w-md text-center">
          {error}
        </Text>
      )}
    </div>
  );
}
