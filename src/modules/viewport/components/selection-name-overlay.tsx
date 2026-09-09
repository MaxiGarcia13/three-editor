import { useStore } from '@nanostores/react';
import { Text } from '@/components/text';

import { $selection } from '../stores/selection-store';

export function SelectionNameOverlay() {
  const { object: selected } = useStore($selection, { keys: ['object'] });

  if (!selected) {
    return null;
  }

  return (
    <Text
      size="sm"
      variant="muted"
      title={selected.name}
      className="pointer-events-none select-none drop-shadow-md"
    >
      {selected.name}
    </Text>
  );
}
