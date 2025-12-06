# MediaPipe Hands assets (not committed)

Binary bundles (`*.wasm`, `*.data`) are intentionally not tracked in git to keep the repository lightweight.
If you prefer to serve MediaPipe Hands assets locally instead of the CDN, download the matching files for
`@mediapipe/hands@0.4.1675469242` into this folder and set `window.MEDIAPIPE_HANDS_ASSET_BASE = '/mediapipe/hands/';`
before loading `Mocap.html`.
