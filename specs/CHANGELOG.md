# Specs changelog

## How it works

- **Open** — planned or in-progress user stories (US-N)
- **Shipped** — one row per completed US after acceptance; fold delta into `current/`, then delete `specs/us-<n>/`
- Do **not** add a row per task — only when a US ships
- Do **not** create `specs/v*` folders; use `specs/us-<n>/` only

## Open

| ID | Summary |
|----|---------|
| **US-14** | Viewport general settings — show/hide axes + length (metres) |
| **US-7** | Multi-clip blending / cross-fade (post-MVP) |
| **US-8** | Morph-target editing (post-MVP) |
| **US-9** | Graph / curve keyframe UI (post-MVP) |
| **US-10** | Full undo / redo stack (post-MVP) |

## Shipped

| ID | Summary |
|----|---------|
| **US-6** | Cross-rig retargeting (explicit bone map + vendor registry) |
| **US-12** | Rename model and animation library entries |
| **US-13** | Selection name overlay in preview (bone / mesh) |
| **US-5** | Zip download: per-model GLBs + animation-only files |
| **US-4** | Keyframe capture via TransformControls |
| **US-3** | Clip trim & mixer time scale |
| **US-11** | Model library — many characters, one previewed |
| **US-2** | Animation library import & playback UI |
| **US-1** | Model load & full-screen R3F viewport |
