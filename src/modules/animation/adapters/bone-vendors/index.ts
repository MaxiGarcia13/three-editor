import type { BoneVendorAdapter } from '@/modules/animation/types/bone-vendor';

import { mixamoBoneVendor } from './mixamo';

/**
 * Registered bone-name vendors for retarget suggestions.
 * Add or remove an adapter here — core registry stays vendor-blind.
 */
export const BONE_VENDOR_ADAPTERS: readonly BoneVendorAdapter[] = [
  mixamoBoneVendor,
];
