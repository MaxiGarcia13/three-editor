# US-10 design

## Scope

In-memory command stack for clip-mutating editor operations.

## Approach

- Command pattern: each edit pushes `{ undo, redo }` (or snapshot before/after of the working clip)
- Prefer clip-level snapshots for correctness early; optimize to patch diffs later if needed
- After undo/redo: replace library working clip reference and rebind mixer action; clear selection if node missing
- Keyboard: Ctrl/Cmd+Z, Ctrl/Cmd+Shift+Z (or Y) when focus is not in a text field that owns those shortcuts

## Relation to US-3

- Migrate “restore pre-trim” to an undoable TrimCommand, or keep restore as a one-shot that also pushes onto the stack consistently

## Non-goals

No durable undo log across reloads in this story.
