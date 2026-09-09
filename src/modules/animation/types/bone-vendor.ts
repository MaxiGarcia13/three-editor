/** Pluggable naming scheme for retarget bone suggestions. */
export interface BoneVendorAdapter {
  /** Stable id (e.g. `mixamo`) — for docs / future toggles. */
  id: string;
  /**
   * Suggest a character bone for `sourceBoneName`, or `null` if this vendor
   * does not recognize the name / has no confident match.
   */
  suggest: (sourceBoneName: string, targetBoneNames: Set<string>) => string | null;
  /**
   * Short UI label for a bone (e.g. `Hips`), or `null` if unrecognized.
   * Does not change track / Object3D names used for playback.
   */
  displayName: (boneName: string) => string | null;
}
