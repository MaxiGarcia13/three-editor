# US-13 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [ ] Confirm `$selection` + clear paths from US-4
- [ ] Lock label rules: `boneDisplayName` for bones (+ raw `title` when different); raw / “Unnamed” for meshes

## Implement

- [ ] Selection name overlay component in `viewport` (or thin shell wrapper) reading `$selection`
- [ ] Mount top-right in `EditorPreview` with mobile-safe offset and `pointer-events-none`
- [ ] Wire bone vs mesh label derivation via `boneDisplayName`

## Verify

- [ ] Select bone → friendly (or raw) name top-right; clear → hidden
- [ ] Select mesh → name or “Unnamed”; switch selection updates label
- [ ] Overlay does not block orbit / pick / transform toolbar
- [ ] All US-13 acceptance criteria in [`requirements.md`](./requirements.md) pass
