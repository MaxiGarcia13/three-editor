# US-9 design

## Scope

Graph or key-list editor for existing clip tracks; complements TransformControls pose capture (US-4).

## Approach

- Read track times/values from the active working clip
- Present a curve graph and/or spreadsheet-style key list
- Mutations go through the same insert/update/delete helpers used by US-4 (single write path)
- Selection sync: viewport bone selection filters visible tracks when possible
- Keep canvas playback on refs; graph UI promotes discrete edits to React state

## Non-goals

No After Effects–grade graph editor in v1 of this story — prioritize correct track mutation and readable UX over fancy Bezier tooling beyond what tracks support.
