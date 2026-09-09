# US-12 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [ ] Confirm `AssetEntry` label is display-only today and list all call sites that show `ModelEntry.fileName` / `ClipEntry.name`
- [ ] Lock rename contract: trim + reject empty; sync `AnimationClip.name` on clip + sourceClip; leave clip `sourceFile` alone

## Implement

- [ ] `renameModel` handler on the model store
- [ ] `renameClip` handler on the clip store (including embedded clip name sync)
- [ ] `AssetEntry` inline rename UX (commit / cancel / a11y labels)
- [ ] Wire rename from `ModelLibrary` and `ClipLibrary`

## Verify

- [ ] Renamed labels show in sidebar and active-clip selector
- [ ] Replace / Remove / Retarget / active selection still work after rename (stable ids)
- [ ] Zip basenames reflect renamed model and clip entries
- [ ] All US-12 acceptance criteria in [`requirements.md`](./requirements.md) pass
