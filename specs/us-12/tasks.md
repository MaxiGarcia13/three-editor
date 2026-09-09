# US-12 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [x] Confirm `AssetEntry` label is display-only today and list all call sites that show `ModelEntry.fileName` / `ClipEntry.name`
- [x] Lock rename contract: trim + reject empty; sync `AnimationClip.name` on clip + sourceClip; leave clip `sourceFile` alone

## Implement

- [x] `renameModel` handler on the model store
- [x] `renameClip` handler on the clip store (including embedded clip name sync)
- [x] `AssetEntry` inline rename UX (commit / cancel / a11y labels)
- [x] Wire rename from `ModelLibrary` and `ClipLibrary`

## Verify

- [x] Renamed labels show in sidebar and active-clip selector
- [x] Replace / Remove / Retarget / active selection still work after rename (stable ids)
- [x] Zip basenames reflect renamed model and clip entries
- [x] All US-12 acceptance criteria in [`requirements.md`](./requirements.md) pass
