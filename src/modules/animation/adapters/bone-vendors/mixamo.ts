import type { BoneVendorAdapter } from '@/modules/animation/types/bone-vendor';

/** Longer prefix must be listed first. */
const PREFIXES = ['mixamorig:', 'mixamorig'] as const;

const ALIASES: Record<string, string> = {
  Hips: 'Hips',
  Spine: 'Spine',
  Spine1: 'Chest',
  Spine2: 'UpperChest',
  Neck: 'Neck',
  Head: 'Head',
  LeftShoulder: 'LeftShoulder',
  LeftArm: 'LeftArm',
  LeftForeArm: 'LeftForeArm',
  LeftHand: 'LeftHand',
  LeftHandThumb1: 'LeftHandThumb1',
  LeftHandThumb2: 'LeftHandThumb2',
  LeftHandThumb3: 'LeftHandThumb3',
  LeftHandIndex1: 'LeftHandIndex1',
  LeftHandIndex2: 'LeftHandIndex2',
  LeftHandIndex3: 'LeftHandIndex3',
  LeftHandMiddle1: 'LeftHandMiddle1',
  LeftHandMiddle2: 'LeftHandMiddle2',
  LeftHandMiddle3: 'LeftHandMiddle3',
  LeftHandRing1: 'LeftHandRing1',
  LeftHandRing2: 'LeftHandRing2',
  LeftHandRing3: 'LeftHandRing3',
  LeftHandPinky1: 'LeftHandPinky1',
  LeftHandPinky2: 'LeftHandPinky2',
  LeftHandPinky3: 'LeftHandPinky3',
  RightShoulder: 'RightShoulder',
  RightArm: 'RightArm',
  RightForeArm: 'RightForeArm',
  RightHand: 'RightHand',
  RightHandThumb1: 'RightHandThumb1',
  RightHandThumb2: 'RightHandThumb2',
  RightHandThumb3: 'RightHandThumb3',
  RightHandIndex1: 'RightHandIndex1',
  RightHandIndex2: 'RightHandIndex2',
  RightHandIndex3: 'RightHandIndex3',
  RightHandMiddle1: 'RightHandMiddle1',
  RightHandMiddle2: 'RightHandMiddle2',
  RightHandMiddle3: 'RightHandMiddle3',
  RightHandRing1: 'RightHandRing1',
  RightHandRing2: 'RightHandRing2',
  RightHandRing3: 'RightHandRing3',
  RightHandPinky1: 'RightHandPinky1',
  RightHandPinky2: 'RightHandPinky2',
  RightHandPinky3: 'RightHandPinky3',
  LeftUpLeg: 'LeftUpLeg',
  LeftLeg: 'LeftLeg',
  LeftFoot: 'LeftFoot',
  LeftToeBase: 'LeftToeBase',
  RightUpLeg: 'RightUpLeg',
  RightLeg: 'RightLeg',
  RightFoot: 'RightFoot',
  RightToeBase: 'RightToeBase',
};

interface MixamoSemantic {
  local: string;
  canonical: string;
}

function stripLeadingDigits(localName: string): string {
  return localName.replace(/^\d+/, '');
}

/** Returns Mixamo semantic keys, or null if the name is not Mixamo-prefixed. */
function mixamoSemantic(boneName: string): MixamoSemantic | null {
  for (const prefix of PREFIXES) {
    if (!boneName.startsWith(prefix)) {
      continue;
    }
    const rawLocal = boneName.slice(prefix.length);
    if (!rawLocal) {
      return null;
    }
    const local = stripLeadingDigits(rawLocal);
    if (!local) {
      return null;
    }
    return {
      local,
      canonical: ALIASES[local] ?? local,
    };
  }
  return null;
}

function keysMatch(a: MixamoSemantic, b: MixamoSemantic): boolean {
  return (
    a.local === b.local
    || a.canonical === b.canonical
    || a.local === b.canonical
    || a.canonical === b.local
  );
}

function suggestMixamo(
  sourceBoneName: string,
  targetBoneNames: Set<string>,
): string | null {
  const source = mixamoSemantic(sourceBoneName);
  if (!source) {
    return null;
  }

  // Prefer Mixamo→Mixamo with the same local bone (Spine1 → mixamorigSpine1)
  // before project-convention aliases (Spine1 → Chest).
  for (const target of targetBoneNames) {
    const targetSemantic = mixamoSemantic(target);
    if (targetSemantic && targetSemantic.local === source.local) {
      return target;
    }
  }

  for (const target of targetBoneNames) {
    const targetSemantic = mixamoSemantic(target);
    if (targetSemantic && keysMatch(source, targetSemantic)) {
      return target;
    }
  }

  if (targetBoneNames.has(source.canonical)) {
    return source.canonical;
  }

  if (targetBoneNames.has(source.local)) {
    return source.local;
  }

  return null;
}

export const mixamoBoneVendor: BoneVendorAdapter = {
  id: 'mixamo',
  suggest: suggestMixamo,
  displayName: (boneName) => mixamoSemantic(boneName)?.local ?? null,
};
