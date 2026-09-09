import { atom } from 'nanostores';

/** Clip id currently open in the Retarget modal; `null` when closed. */
export const $retargetClipId = atom<string | null>(null);

export function openRetarget(clipId: string): void {
  $retargetClipId.set(clipId);
}

export function closeRetarget(): void {
  if ($retargetClipId.get() !== null) {
    $retargetClipId.set(null);
  }
}
