# US-13 — Selection name overlay

Delta for showing the name of the currently selected bone or mesh in the preview chrome. Parent contract: [`specs/current/requirements.md`](../current/requirements.md).

**Depends on:** US-4 (raycast selection + TransformControls). Do not start until explicitly kicked off.

## Story

As an editor user, when I click a bone or part of the model, I can see its name in a floating label on the preview so I know what is selected.

## Acceptance

- [ ] When a bone or mesh is selected via existing raycast selection, a floating label in the **top-right** of the preview shows that object’s name
- [ ] The label updates immediately when the selection changes to another object
- [ ] The label is hidden when there is no selection (cleared or never selected)
- [ ] Bones use a friendly vendor display name when the bone registry recognizes the name; otherwise the raw `Object3D.name`. When friendly ≠ raw, the raw name is available (e.g. tooltip `title`)
- [ ] Meshes (and other non-bone picks) show `Object3D.name`, or a clear fallback when the name is empty (e.g. “Unnamed”)
- [ ] The overlay is non-interactive (`pointer-events-none`) and does not block orbit, picking, or the transform-mode toolbar
- [ ] Label remains readable on the dark viewport (contrast); layout works on desktop and mobile preview chrome

## Out of scope for this delta

- Editing / renaming scene node or bone names
- Hover-only highlight labels without a click selection
- 3D world-space name tags attached to bones in the canvas
- Selection outline / color highlight beyond what US-4 already provides
