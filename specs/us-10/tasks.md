# US-10 tasks

Do not start until explicitly kicked off. Tick only after acceptance.

## Prep

- [ ] List MVP edit operations that must be commands (trim, keyframe write, …)
- [ ] Decide snapshot vs patch for v1 (default: clip snapshot)

## Implement

- [ ] Command stack service in `animation` (or `editor-shell`) domain
- [ ] Wrap trim + keyframe mutations as commands
- [ ] Undo / Redo UI + shortcuts
- [ ] Mixer rebind after stack ops; integrate or replace US-3 pre-trim restore

## Verify

- [ ] All US-10 acceptance criteria in [`requirements.md`](./requirements.md) pass
