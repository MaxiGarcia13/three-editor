import type { AssetStatus } from './types';

export const statusBadgeClass: Record<AssetStatus, string> = {
  ready: 'bg-emerald-500/15 text-emerald-400',
  error: 'bg-amber-500/15 text-amber-400',
};

export const defaultStatusLabel: Record<AssetStatus, string> = {
  ready: 'Ready',
  error: 'Needs attention',
};
