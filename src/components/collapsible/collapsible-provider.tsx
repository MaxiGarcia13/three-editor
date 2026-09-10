import { useId, useState } from 'react';
import { CollapsibleContext } from './collapsible-context';

interface CollapsibleProviderProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleProvider({ children, defaultOpen = false }: CollapsibleProviderProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <CollapsibleContext value={{ open, panelId, setOpen }}>
      {children}
    </CollapsibleContext>
  );
}
