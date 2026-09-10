import { use } from 'react';
import { CollapsibleContext } from './collapsible-context';

export function useCollapsible() {
  return use(CollapsibleContext);
}
