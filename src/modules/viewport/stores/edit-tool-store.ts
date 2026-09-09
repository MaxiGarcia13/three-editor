import { atom } from 'nanostores';

export type EditTool = 'edit' | 'move';

export const $editTool = atom<EditTool>('edit');

export function setEditTool(tool: EditTool): void {
  if ($editTool.get() !== tool) {
    $editTool.set(tool);
  }
}
