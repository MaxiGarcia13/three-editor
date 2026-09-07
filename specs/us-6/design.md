# US-6 design

## Scope

Explicit retarget of foreign `AnimationClip` tracks onto the loaded character skeleton.

## Approach

1. Detect mismatch (unknown track targets vs character node/bone names)
2. Present mapping UI: source track/bone → target bone (with optional registry-based suggestions)
3. Produce a **new** working clip with remapped track names (and rest-pose / bind-pose compensation if required by the chosen algorithm)
4. Keep the source clip immutable; retargeted result is a separate library entry or replaces the working copy with restore to source

## Registry

- Central bone-name registry / alias table (e.g. Mixamo → project convention)
- Playback and mixer code consume only resolved target names — never vendor-specific string literals inline

## Non-goals

No automatic silent retarget on import (MVP US-2 error path remains the default until the user enters this flow).
