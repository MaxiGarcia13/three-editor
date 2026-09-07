import type { AnimationAction } from 'three';

import { LoopOnce, LoopRepeat } from 'three';

export function applyLoopMode(action: AnimationAction, loop: boolean): void {
  action.setLoop(loop ? LoopRepeat : LoopOnce, loop ? Infinity : 1);
  action.clampWhenFinished = !loop;
}
