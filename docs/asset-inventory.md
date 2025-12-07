# Inventario exhaustivo de assets

## Entradas web y bundle generado
- `index.html`: hub principal con tarjetas hacia todas las escenas.
- `menu.html`: página que carga el bundle compilado de BOX9 (`public/box9.js`) para el travelling ringside.
- `bolsa.html`: Gym Box 8, POV con pose y loops de saco (evolución de sacobox8).
- `gim1.html`, `gim2.html`, `gim3.html`, `gim4.html`: gimnasios Box 10–13 (MMA, Bodybuilder, Tyson POV y bolsa introductoria).
- `Mocap.html`, `ring.html`: escenas de mocap y POV en Three.js.
- `public/box9.js`: bundle JavaScript generado por `npm run build` a partir del código en `src/box9`.

## Código fuente de BOX9
- `src/box9/index.ts`: inicialización de la app y arranque de la escena.
- `src/box9/scene.ts`: construcción de la escena 3D.
- `src/box9/assets.ts`: gestor de assets que define los modelos de ring y luchadores.
- `src/box9/effects.ts`: efectos visuales asociados al combate.
- `src/box9/state.ts`: definición de tipos y estado compartido (IDs de luchadores y ring incluidos).
- `src/box9/progression.ts`: lógica de progresión del combate y rondas.
- `src/box9/selection.ts`: flujo de selección de luchador y entorno.
- `src/box9/ui.ts`: componentes de UI y HUD.

## Documentación
- `docs/box9/rfc.md`: especificación funcional de BOX9.
- `docs/box9/test-plan.md`: plan de pruebas asociado a BOX9.
- `docs/sacobox7_spec.md`: especificación para la experiencia "sacobox7".
- `docs/progresion-hitos.md`: hitos y fases de progreso del proyecto.
- `docs/gimnasios-ambientacion.md`: notas de ambientación para gimnasios y escenarios, incluyendo las variantes `bolsa.html` y `gim*.html`.
- `docs/personajes.md`: catálogo de personajes, estilos y referencias visuales.
- `docs/progress-panel-mockups.md`: mockups y checklist de panel de progreso.

## Modelos 3D (`modelos/`)
- `modelos/Ring.glb`, `modelos/Ring 2.glb`, `modelos/Ring 3.glb`: variantes de ring/arena en formato GLB.
- `modelos/MMA.glb`, `modelos/BodyBuilder.glb`, `modelos/Dummy.glb`, `modelos/Bolsa.glb`: modelos GLB de luchadores y accesorios.
- `modelos/Tyson.fbx`, `modelos/Punching Bag.fbx`, `modelos/Training Dummy.fbx`: modelos FBX de personajes y bolsa de boxeo.
- `modelos/Guantes_Amateur.obj`: modelo OBJ de guantes amateur.
- `modelos/Guantes_PRO/mesh.obj`, `modelos/Guantes_PRO/mesh.mtl`, `modelos/Guantes_PRO/mesh.obj.mtl`: modelo OBJ+MTL de guantes profesionales.
- `modelos/Guantes_PRO/tex_0.jpg`, `modelos/Guantes_PRO/tex_1.jpg`: texturas asociadas a los guantes profesionales.

## Animaciones (`animaciones/`)
- Ataque (`animaciones/ataque/`): `Boxing.fbx`, `Hook.fbx`, `Illegal Elbow Punch.fbx`, `Jab Cross.fbx`, `Lead Jab.fbx`, `Punching Bag.fbx`.
- Daño (`animaciones/daño/`): `Big Kidney Hit.fbx`, `Head Hit.fbx`, `Light Hit To Head.fbx`, `Medium Hit To Head.fbx`, `Reaction.fbx`, `Receive Uppercut To The Face.fbx`, `Taking Punch.fbx`.
  - Caídas (`animaciones/daño/caida/`): `Convulsing.fbx`, `Fall Flat.fbx`, `Fall Over.fbx`, `Getting Up.fbx`, `Knocked Down.fbx`, `Laying.fbx`, `Livershot Knockdown.fbx`, `Shoulder Hit And Fall.fbx`, `Situp To Idle.fbx`.
- Defensa (`animaciones/defensa/`): `Dodging.fbx`, `Left Block.fbx`.
- Descanso (`animaciones/descanso/`): `Action Idle To Fight Idle.fbx`, `Arm Stretching.fbx`, `Pointing Forward.fbx`.
- Movimiento (`animaciones/movimiento/`): `Walk back.fbx`, `Walking.fbx`.

## Texturas (`texturas/`)
- Suelo/escenario: `internal_ground_ao_texture.jpeg`.
- Guantes: `Boxing_Gloves_BUMP.jpg`, `Boxing_Gloves_Leather_Tan.jpg`.
- Personajes y accesorios: `BodyBuilder.jpeg`, `MMA.jpeg`, `Tyson.jpeg`, `Training Dummy_albedo.jpeg`, `Training Dummy_albedo.jpg`, `Training Dummy_AO.jpeg`, `Training Dummy_AO.jpg`, `Training Dummy_metallic.jpeg`, `Training Dummy_metallic.jpg`, `Training Dummy_normal.png`, `Training Dummy_roughness.jpeg`, `Training Dummy_roughness.jpg`.

## Sonidos (`sonidos/`)
- Golpes: `golpe_1.mp3`, `golpe_2.mp3`, `golpe_3.mp3`, `golpe_4.mp3`, `golpe_5.mp3`, `golpe_7.mp3`, `golpe_8.mp3`, `golpe_9.mp3`, `golpe_10.mp3`.
- Efectos ambientales: `campana.mp3`, `cuenta_atras.wav`, `impacto_grave.wav`, `respira.wav`.
- Público: `publico_intro.wav`, `publico_enojado.wav`, `publico_victoria.wav`.
- Voces/gritos: `grito_1.wav`, `grito_2.wav`, `grito_3.wav`, `hombre_grita.wav`.

## Mapeo de assets en el gestor (`src/box9/assets.ts`)
- Rings: `mmaGym` → `modelos/Ring.glb`, `bodybuilderArena` → `modelos/Ring 2.glb`, `tysonRing` → `modelos/Ring 3.glb`; valor por defecto → `modelos/Ring.glb`.
- Luchadores: `mma` → `modelos/MMA.glb`, `bodybuilder` → `modelos/BodyBuilder.glb`, `tyson` → `modelos/Tyson.fbx` (rotado PI en Y), `dummy` → `modelos/Dummy.glb`, `bag` → `modelos/Punching Bag.fbx` (rotado −PI/2 en X).
- Escalado por defecto: GLB a escala 1, FBX a escala 0.01 con clonación de mallas esqueléticas.
