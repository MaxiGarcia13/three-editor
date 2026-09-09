# US-6 design

## Scope

Explicit retarget of foreign `AnimationClip` tracks onto the loaded character skeleton.

## Approach

1. Detect mismatch (unknown track targets vs character bone names)
2. Library shows a **Retarget** button on errored clips only — does not embed the mapping UI
3. Opening retarget opens a **modal** (Settings aside stays available); Cancel / overlay / Escape closes
4. Mapping UI: clip bone → character bone, with registry suggestions, mapped/unmapped status, progress, and “show unmapped only”. **UI shows short vendor labels** (e.g. `Hips`); hover/`title` keeps the raw id. Mapping values and remapped tracks always use real bone names.
5. Target dropdown lists **skeleton bones only** (not meshes / scene roots)
6. Produce a **new** working clip with remapped track names; source clip stays immutable

## Registry (vendor adapters)

- **Core** (`bone-registry.ts`) is vendor-blind: exact name match, then first confident suggestion from registered adapters, then `buildAutoMapping` / `buildTargetBoneNames` / `boneDisplayName`
- **Adapters** implement `BoneVendorAdapter` (`types/bone-vendor.ts`): `suggest` + `displayName`. Each vendor is a separate module under `services/bone-vendors/`
- Playback / mixer / remap never import vendor strings — only resolved target names
- Composition: `services/bone-vendors/index.ts` lists adapters. Add/remove a vendor by editing that list only

### Adapters

| Id | Module | Behavior |
| -- | ------ | -------- |
| `mixamo` | `bone-vendors/mixamo.ts` | Prefixes `mixamorig:` / `mixamorig` (longest first). Strip leading digits after the prefix (`mixamorig8Hips` → `Hips`). Alias local names to project convention where they differ (`Spine1` → `Chest`). Match a target whose Mixamo-normalized local/canonical equals the source. UI `displayName` is the local bone (`Hips`). |

Suggestions autofill the mapping UI only; Apply is still required (no silent retarget on import).

## Chrome

- `$retargetClipId` (animation UI store) drives the Retarget **modal**
- Settings aside stays mounted; modal portals over the editor (`Modal` + `RetargetModal`)

## Follow-up (not started)

Planned refinements — do not implement until kicked off:

1. ~~**Modal chrome**~~ — done (mapping UI in a modal; Settings aside restored)
2. **Multi-model Fix** — clips are shared; switching the previewed model re-validates against that skeleton. When a clip is ready on Model A but errors on Model B, offer Fix / Retarget for B. Apply adds a new ready clip for the current character and **keeps** the source entry (A can still use it)
3. Do **not** remove the source clip on Apply (would break the other model’s matching clip)

## Non-goals

No automatic silent retarget on import (MVP US-2 error path remains the default until the user enters this flow).
