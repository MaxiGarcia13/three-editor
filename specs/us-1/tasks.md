# US-1 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [x] Install `three`, `@react-three/fiber`, `@react-three/drei` (+ types if required)
- [x] Confirm Astro React island entry on the home page

## Implement

- [x] `editor-shell` layout: full-screen stage + collapsible sidebar
  - Home page mounts `EditorSidebar` + `EditorPreview` islands (`client:only="react"`)
  - Sidebar collapse/expand with `ChevronLeft` / `ChevronRight` (shared `ICON_SIZE` in `src/components/icons/constants.ts`)
- [ ] Character file input + blob URL / load adapter
- [ ] `viewport` R3F canvas with lights + OrbitControls
- [ ] Mount loaded character; dispose previous on replace
- [ ] Empty and error states (missing skeleton / parse failure)
- [ ] Default camera framing after successful load

## Verify

- [ ] All US-1 acceptance criteria in [`requirements.md`](./requirements.md) pass
- [ ] No animation/export code left half-wired in this delta
