import { createContext, use } from 'react';

export interface CollapsibleContextType {
  open: boolean;
  panelId: string;
  setOpen: (open: boolean) => void;
}

export const CollapsibleContext = createContext<CollapsibleContextType>({
  open: false,
  setOpen: () => {},
  panelId: '',
});

export function useCollapsible() {
  return use(CollapsibleContext);
}
