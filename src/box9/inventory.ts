export interface AssetItem {
  label: string;
  detail?: string;
}

export interface AssetSection {
  title: string;
  items: AssetItem[];
}

const entryPoints: AssetSection = {
  title: 'Entradas web y bundle',
  items: [
    { label: 'index.html', detail: 'Punto de entrada principal para la app basada en Vite.' },
    { label: 'box9.html', detail: 'Carga el bundle compilado de BOX9.' },
    {
      label: 'Cyber_boxing.html, Mocap.html, Neon_Fight.html, sacobox5.html, sacobox6.html, sacobox7.html, sacobox8.html',
      detail: 'Páginas HTML adicionales de experiencias o pruebas.'
    },
    { label: 'public/box9.js', detail: 'Bundle JavaScript generado por build a partir de `src/box9`.' }
  ]
};

const sourceCode: AssetSection = {
  title: 'Código fuente de BOX9',
  items: [
    { label: 'src/box9/index.ts', detail: 'Inicialización de la app y arranque de la escena.' },
    { label: 'src/box9/scene.ts', detail: 'Construcción de la escena 3D y flujos de cámara.' },
    { label: 'src/box9/assets.ts', detail: 'Gestor de assets que define rings y luchadores.' },
    { label: 'src/box9/effects.ts', detail: 'Efectos visuales asociados al combate.' },
    { label: 'src/box9/state.ts', detail: 'Tipos y estado compartido (IDs de luchadores y ring incluidos).' },
    { label: 'src/box9/progression.ts', detail: 'Lógica de progresión del combate y rondas.' },
    { label: 'src/box9/selection.ts', detail: 'Flujo de selección de luchador y entorno.' },
    { label: 'src/box9/ui.ts', detail: 'Componentes de UI y HUD.' }
  ]
};

const documentation: AssetSection = {
  title: 'Documentación',
  items: [
    { label: 'docs/box9/rfc.md', detail: 'Especificación funcional de BOX9.' },
    { label: 'docs/box9/test-plan.md', detail: 'Plan de pruebas asociado a BOX9.' },
    { label: 'docs/sacobox7_spec.md', detail: 'Especificación para la experiencia "sacobox7".' }
  ]
};

const models: AssetSection = {
  title: 'Modelos 3D',
  items: [
    { label: 'modelos/Ring.glb', detail: 'Ring/arena GLB.' },
    { label: 'modelos/Ring 2.glb', detail: 'Ring alternativo GLB.' },
    { label: 'modelos/Ring 3.glb', detail: 'Ring alternativo GLB.' },
    { label: 'modelos/MMA.glb', detail: 'Modelo GLB luchador MMA.' },
    { label: 'modelos/BodyBuilder.glb', detail: 'Modelo GLB BodyBuilder.' },
    { label: 'modelos/Dummy.glb', detail: 'Modelo GLB Dummy.' },
    { label: 'modelos/Bolsa.glb', detail: 'Modelo GLB de bolsa.' },
    { label: 'modelos/Tyson.fbx', detail: 'Modelo FBX Tyson (rotado PI en Y).' },
    { label: 'modelos/Punching Bag.fbx', detail: 'Modelo FBX de punching bag (rotado −PI/2 en X).' },
    { label: 'modelos/Training Dummy.fbx', detail: 'Modelo FBX de dummy de entrenamiento.' },
    { label: 'modelos/Guantes_Amateur.obj', detail: 'Modelo OBJ de guantes amateur.' },
    { label: 'modelos/Guantes_PRO/mesh.obj', detail: 'Modelo OBJ guantes pro.' },
    { label: 'modelos/Guantes_PRO/mesh.mtl', detail: 'Materiales MTL guantes pro.' },
    { label: 'modelos/Guantes_PRO/mesh.obj.mtl', detail: 'Material auxiliar de mapeo MTL.' },
    { label: 'modelos/Guantes_PRO/tex_0.jpg', detail: 'Textura de guantes pro.' },
    { label: 'modelos/Guantes_PRO/tex_1.jpg', detail: 'Textura de guantes pro.' }
  ]
};

const animations: AssetSection = {
  title: 'Animaciones',
  items: [
    {
      label: 'Ataque',
      detail: 'Boxing.fbx, Hook.fbx, Illegal Elbow Punch.fbx, Jab Cross.fbx, Lead Jab.fbx, Punching Bag.fbx'
    },
    {
      label: 'Daño',
      detail:
        'Big Kidney Hit.fbx, Head Hit.fbx, Light Hit To Head.fbx, Medium Hit To Head.fbx, Reaction.fbx, Receive Uppercut To The Face.fbx, Taking Punch.fbx'
    },
    {
      label: 'Caídas',
      detail:
        'Convulsing.fbx, Fall Flat.fbx, Fall Over.fbx, Getting Up.fbx, Knocked Down.fbx, Laying.fbx, Livershot Knockdown.fbx, Shoulder Hit And Fall.fbx, Situp To Idle.fbx'
    },
    { label: 'Defensa', detail: 'Dodging.fbx, Left Block.fbx' },
    { label: 'Descanso', detail: 'Action Idle To Fight Idle.fbx, Arm Stretching.fbx, Pointing Forward.fbx' },
    { label: 'Movimiento', detail: 'Walk back.fbx, Walking.fbx' }
  ]
};

const textures: AssetSection = {
  title: 'Texturas',
  items: [
    { label: 'internal_ground_ao_texture.jpeg', detail: 'Suelo/escenario.' },
    { label: 'Boxing_Gloves_BUMP.jpg', detail: 'Bump de guantes.' },
    { label: 'Boxing_Gloves_Leather_Tan.jpg', detail: 'Textura de cuero guantes.' },
    { label: 'BodyBuilder.jpeg', detail: 'Textura de personaje BodyBuilder.' },
    { label: 'MMA.jpeg', detail: 'Textura de personaje MMA.' },
    { label: 'Tyson.jpeg', detail: 'Textura de personaje Tyson.' },
    { label: 'Training Dummy_albedo.jpeg', detail: 'Albedo de dummy.' },
    { label: 'Training Dummy_albedo.jpg', detail: 'Albedo de dummy (variante).' },
    { label: 'Training Dummy_AO.jpeg', detail: 'Ambient occlusion dummy.' },
    { label: 'Training Dummy_AO.jpg', detail: 'Ambient occlusion dummy (variante).' },
    { label: 'Training Dummy_metallic.jpeg', detail: 'Mapa metallic dummy.' },
    { label: 'Training Dummy_metallic.jpg', detail: 'Mapa metallic dummy (variante).' },
    { label: 'Training Dummy_normal.png', detail: 'Normal map dummy.' },
    { label: 'Training Dummy_roughness.jpeg', detail: 'Roughness dummy.' },
    { label: 'Training Dummy_roughness.jpg', detail: 'Roughness dummy (variante).' }
  ]
};

const sounds: AssetSection = {
  title: 'Sonidos',
  items: [
    { label: 'Golpes', detail: 'golpe_1.mp3, golpe_2.mp3, golpe_3.mp3, golpe_4.mp3, golpe_5.mp3, golpe_7.mp3, golpe_8.mp3, golpe_9.mp3, golpe_10.mp3' },
    { label: 'Efectos ambientales', detail: 'campana.mp3, cuenta_atras.wav, impacto_grave.wav, respira.wav' },
    { label: 'Público', detail: 'publico_intro.wav, publico_enojado.wav, publico_victoria.wav' },
    { label: 'Voces/gritos', detail: 'grito_1.wav, grito_2.wav, grito_3.wav, hombre_grita.wav' }
  ]
};

const assetManagerMap: AssetSection = {
  title: 'Mapeo del gestor de assets',
  items: [
    { label: 'Ring por defecto', detail: 'mmaGym → modelos/Ring.glb; bodybuilderArena → modelos/Ring 2.glb; tysonRing → modelos/Ring 3.glb' },
    {
      label: 'Luchadores',
      detail: 'mma → modelos/MMA.glb; bodybuilder → modelos/BodyBuilder.glb; tyson → modelos/Tyson.fbx (PI en Y); dummy → modelos/Dummy.glb; bag → modelos/Punching Bag.fbx (-PI/2 en X)'
    },
    { label: 'Escalado', detail: 'GLB escala 1; FBX escala 0.01 con clonación de mallas esqueléticas.' }
  ]
};

export const BOX9_ASSET_SECTIONS: AssetSection[] = [
  entryPoints,
  sourceCode,
  documentation,
  models,
  animations,
  textures,
  sounds,
  assetManagerMap
];
