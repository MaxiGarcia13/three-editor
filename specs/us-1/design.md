# US-1 design

## Scope

Model load + viewport shell only. No mixer, clip library, or exporter.

## Structure

- Astro page hydrates one editor React island (`client:load` or equivalent)
- `editor-shell`: layout, collapsible sidebar, file input for model
- `viewport`: R3F `Canvas`, lights, ground/helpers as needed, OrbitControls, model scene graph once loaded

## Load path

1. User picks `.glb` / `.gltf` (File API)
2. Adapter parses via GLTFLoader (drei `useGLTF` with blob URL, or imperative loader)
3. Validate skinned mesh + skeleton present; else set error state and do not mount a broken graph
4. Replace any previously loaded model (single model at a time)

## UI

- Full-bleed canvas
- Collapsible sidebar with model upload control and empty/error copy
- Camera: orbit / pan / zoom; reasonable default framing after load (fit box or fixed offset — pick one and document in code constants)

## Non-goals

Do not add a second debug canvas, FPS overlay render path, or temporary smoke-test scene that bypasses the same lifecycle as the editor viewport.
