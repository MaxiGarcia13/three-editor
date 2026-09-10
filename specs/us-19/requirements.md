# US-19 — Nested library + clip ownership

Delta for nested Models / per-model clips / Shared Animations, clip ownership, conflict-aware retarget, and iconized library actions. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-2, US-6, US-11, US-12. Do not start until explicitly kicked off.

## Story

As an editor user, I manage models and animations in a nested library: each model owns its clips, shared animations stay in a common pool, and retarget can fix one model or partially succeed across many.

## Acceptance

- [ ] Library sidebar is nested: **Models** collapsible (upload) → each **model** collapsible + sibling **Shared Animations** collapsible
- [ ] Model header shows **ModelIcon** next to the name; actions are icons: Retarget (when conflicted), **Animation** (add), Edit (rename), Replace, Remove
- [ ] Shared Animations header shows **AnimationIcon**; actions: Upload, New animation
- [ ] Each clip row shows **AnimationIcon** next to the name; Remove (and Retarget when conflicted) as icons
- [ ] Clips have ownership: `ownerModelId: string | null` (`null` = shared; otherwise listed only under that model)
- [ ] Import / New from Shared → shared (`ownerModelId: null`); create / import under a model → owned by that model
- [ ] **Add animation** via model-header **AnimationIcon**: modal offers **Create new** (`startNewAnimation` owned by that model) and **Add existing** (selector of cloneable clips, excluding already owned / same-name under that model) → Apply → model-owned **clone** (new id); source unchanged
- [ ] Removing a model deletes its owned clips
- [ ] **Retarget → This model:** new remapped ready clip owned by the previewed model; shared original kept in Shared Animations
- [ ] **Retarget → All models:** remap shared clip in place; normalize bones on models that can resolve; **partial success** — incompatible models stay conflicted (no fail-entire-apply)
- [ ] Conflict (skeleton mismatch) surfaces as Needs retarget / amber treatment relative to the model in context (previewed for Shared; that model for owned rows)
- [ ] Model-header Retarget enabled when any clip is conflicted for that model; opens retarget for selected / first conflicted clip
- [ ] Export per model packs that model’s owned clips + shared clips that validate for it; skips conflicted shared

## Out of scope for this delta

- Multi-model simultaneous preview / per-model playback selection (US-20)
- Morphs, curve UI, undo (US-8…US-10)
