# US-19 design

## Scope

Nested library UI, clip ownership (`ownerModelId`), Add-animation clone form, conflict display, and partial **All models** retarget. Replaces the flat Model + Animations sections.

## Data model

Extend `ClipEntry`:

- `ownerModelId: string | null` — `null` = Shared Animations; otherwise listed only under that model
- Shared import / New → `null`; create / import under a model → that model’s id
- Model remove → delete owned clips

Validation (`syncClipsToSkeleton`):

- Owned clips validate against their owner skeleton
- Shared clips validate against the model in context (previewed for Shared section UI; a given model when checking that model’s conflicts)
- Conflict = today’s error / Needs retarget amber treatment

## Retarget

- **This model:** new ready clip with `ownerModelId = activeModelId`; source stays shared
- **All models:** replace shared entry with remapped clip; rename bones only on models that resolve the map; leave incompatible models unchanged and conflicted for that shared clip (no whole-apply failure)

## UI

```text
Library (CollapsibleAside)
└─ Models (Collapsible) [Upload model]
   ├─ Model N (Collapsible) [ModelIcon] [Retarget?][Animation][Edit][Replace][Remove]
   │  └─ owned clip rows [select][AnimationIcon][name][Remove] (+ Retarget when conflict)
   └─ Shared Animations (Collapsible) [AnimationIcon] [Upload][New]
      └─ shared clip rows [select][AnimationIcon][name][Remove] (+ Retarget when conflict)
```

- Extend `Collapsible` with optional `leading` and `actions` (actions stop propagation)
- Iconize `AssetEntry` actions (`aria-label`); optional leading icon for clip rows
- Icons: `ModelIcon`, `AnimationIcon`, `RetargetIcon`, `EditIcon`, `ReplaceIcon`, `TrashIcon`, `UploadIcon`
- **Add animation:** model-header `AnimationIcon` opens a modal — **Create new** or **Add existing** (`Select` of cloneable clips, hide already applied by name/ownership) → clone with `ownerModelId` set
- Model-header Retarget: enabled when any clip conflicted for that model; opens existing `RetargetModal`

## Export

Per-model GLB: owned clips for that model + shared clips that validate; skip conflicted shared.

## Non-goals

Multi-model viewport / per-model simultaneous clip selection (US-20).
