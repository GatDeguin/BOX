# Especificación breve Box 7 (Ring POV + Pose)

## Requisitos funcionales
- **Cámaras:** alternar vista de 1ª persona (POV sobre el boxeador) y vista de 3ª persona orbital con OrbitControls.
- **Webcam/Pose:** iniciar captura al clic, pedir permisos y usar MediaPipe Pose para mapear landmarks a la pose del boxeador; overlay con keypoints sobre el feed.
- **Presets de iluminación:** selector día/noche que cambie colores, intensidades, fondo y niebla.
- **Audio:** botón de mute global para ambiente y SFX; reproducir campana y crowd loop cuando hay permiso de cámara.
- **Fallback de control:** mantener soporte de teclado/gamepad como respaldo cuando la pose no está disponible.
- **UI mínima:** overlay central con instrucciones y atajos, botones flotantes para preset, vista y mute, tarjeta de error de cámara con reintento.

## Inventario de assets
- **modelos/**
  - `Bolsa.glb`
  - `Dummy.glb`
  - `Guantes.obj`
  - `Punching Bag.fbx`
  - `Ring 2.glb`
  - `Ring 3.glb`
  - `Ring.glb`
  - `Tyson.fbx`
- **texturas/**
  - `gltf_embedded_0.jpeg`
- **licencias:** no hay metadatos de licencia dentro del repositorio para los modelos o la textura; se requieren confirmaciones de origen/uso antes de distribución.
- **faltantes detectados:** el flujo usa un `Tyson.glb` para GLTFLoader, pero el repositorio solo incluye `Tyson.fbx`; se necesita un GLB equivalente o ajustar el loader.

## UX objetivo
- **Flujo de inicio:** la escena muestra overlay con instrucciones; al primer clic solicita permiso de cámara, enciende ambiente de audio y habilita control por pose.
- **Permisos de cámara:** manejar errores mostrando la tarjeta de overlay con mensaje y botón de reintento; incluir etiqueta sobre el feed indicando cómo habilitarlo.
- **Feedback de errores:** estado visible/oculto del overlay, texto contextual y logging en consola para depurar.
- **Atajos/ayudas:** encabezado documenta atajos (`V` vista, `L` preset, `M` mute, `Espacio` pausa pose) y el objetivo de mantener guardia frente al saco.
