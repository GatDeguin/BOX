import {
  Color,
  Clock,
  Mesh,
  Object3D,
  PerspectiveCamera,
  Scene,
  AnimationMixer,
  AnimationClip,
  AnimationAction,
  SpotLight,
  Vector2,
  Vector3,
  WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { AssetHooks, AssetManager, LoadedAsset } from './assets';
import { box9Store, CharacterId, RingId } from './state';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
import { EffectProfileName, applyEffects, registerEffectsContext } from './effects';

export interface SceneFlowOptions {
  backgroundColor?: string | number;
  travelingStart?: Vector3;
  freeCamStart?: Vector3;
  focus?: number;
  aperture?: number;
  maxBlur?: number;
}

type ScenePhase = 'intro' | 'selection' | 'free';

interface SceneFlowContext {
  container: HTMLElement;
  renderer: WebGLRenderer;
  scene: Scene;
  composer: EffectComposer;
  renderPass: RenderPass;
  bokehPass: BokehPass;
  outputPass: OutputPass;
  travelingCamera: PerspectiveCamera;
  freeCamera: PerspectiveCamera;
  activeCamera: PerspectiveCamera;
  freeCamControls: OrbitControls | null;
  pointerLockControls: PointerLockControls | null;
  freeCamKeyState: { forward: boolean; backward: boolean; left: boolean; right: boolean };
  freeCamInputHandlers: { keydown: (event: KeyboardEvent) => void; keyup: (event: KeyboardEvent) => void } | null;
  pointerLockClickHandler: (() => void) | null;
  phase: ScenePhase;
  selectionTarget: SelectionTarget | null;
  animationFrame: number | null;
  resizeHandler: (() => void) | null;
  resizeObserver: ResizeObserver | null;
  pendingResize: number | null;
  clock: Clock;
  selectionLight: SpotLight | null;
  eventHandlers: Record<string, EventListener>;
  ringModel: Object3D | null;
  fighterModel: Object3D | null;
  fighterMixer: AnimationMixer | null;
  fighterActions: Partial<Record<'idle' | 'pose', AnimationAction>>;
  activeFighterAction: AnimationAction | null;
}

interface SelectionTarget {
  camera: Vector3;
  lookAt: Vector3;
  highlight: Vector3;
}

interface FighterAnchor {
  position: Vector3;
  rotation: Vector3;
}

const SELECTION_FOCUS: Record<CharacterId, SelectionTarget> = {
  mma: {
    camera: new Vector3(-3.5, 2.8, 8),
    lookAt: new Vector3(-1.5, 1.8, 0),
    highlight: new Vector3(-1.5, 2.5, 0)
  },
  bodybuilder: {
    camera: new Vector3(0, 3.1, 8.5),
    lookAt: new Vector3(0, 1.8, 0),
    highlight: new Vector3(0, 2.5, 0)
  },
  tyson: {
    camera: new Vector3(3.5, 2.8, 8),
    lookAt: new Vector3(1.5, 1.8, 0),
    highlight: new Vector3(1.5, 2.5, 0)
  }
};

const FIGHTER_ANCHORS: Record<CharacterId, FighterAnchor> = {
  mma: {
    position: new Vector3(-1.6, 0, 0.8),
    rotation: new Vector3(0, Math.PI / 10, 0)
  },
  bodybuilder: {
    position: new Vector3(0, 0, 0.9),
    rotation: new Vector3(0, 0, 0)
  },
  tyson: {
    position: new Vector3(1.6, 0, 0.8),
    rotation: new Vector3(0, -Math.PI / 10, 0)
  }
};

const DEFAULT_OPTIONS: Required<Pick<SceneFlowOptions, 'backgroundColor' | 'focus' | 'aperture' | 'maxBlur'>> = {
  backgroundColor: '#05070c',
  focus: 10,
  aperture: 0.025,
  maxBlur: 0.01
};

const PHASE_EFFECTS: Record<ScenePhase, EffectProfileName> = {
  intro: 'championNight',
  selection: 'mmaGym',
  free: 'ironShow'
};

const ALL_RINGS: RingId[] = ['mmaGym', 'bodybuilderArena', 'tysonRing'];
const ALL_FIGHTERS: CharacterId[] = ['mma', 'bodybuilder', 'tyson'];

const RING_VISUALS: Record<RingId, { effectProfile: EffectProfileName; selectionLight: { color: string; intensity: number } }> = {
  mmaGym: { effectProfile: 'mmaGym', selectionLight: { color: '#7ad8ff', intensity: 1.45 } },
  bodybuilderArena: { effectProfile: 'ironShow', selectionLight: { color: '#ffb55c', intensity: 1.5 } },
  tysonRing: { effectProfile: 'championNight', selectionLight: { color: '#ff6b81', intensity: 1.6 } }
};

let context: SceneFlowContext | null = null;
const assetHookListeners = new Set<AssetHooks>();
const assetManager = new AssetManager({
  onProgress: (url, ratio) => {
    assetHookListeners.forEach((hooks) => hooks.onProgress?.(url, ratio));
  },
  onError: (url, error) => {
    assetHookListeners.forEach((hooks) => hooks.onError?.(url, error));
  }
});

let activeRingRequest = 0;
let activeFighterRequest = 0;
let currentRingModel: Object3D | null = null;
let currentFighterModel: Object3D | null = null;

function applyPhaseEffects(phase: ScenePhase) {
  const ring = box9Store.getState().ring;
  const profile = RING_VISUALS[ring]?.effectProfile ?? PHASE_EFFECTS[phase];
  applyEffects(profile);
}

function applyRingVisualState(ring: RingId, options: { updateEffects?: boolean } = {}) {
  if (!context) return;
  const visuals = RING_VISUALS[ring];
  if (!visuals) return;

  const { updateEffects = true } = options;

  if (context.selectionLight) {
    context.selectionLight.color.set(visuals.selectionLight.color);
    context.selectionLight.intensity = visuals.selectionLight.intensity;
  }

  if (updateEffects) {
    applyEffects(visuals.effectProfile);
  }
}

function ensureAnimationLoop() {
  if (!context) return;
  if (context.animationFrame !== null) return;

  context.clock.start();
  context.animationFrame = requestAnimationFrame(animate);
}

function stopAnimationLoop() {
  if (!context) return;
  if (context.animationFrame !== null) {
    cancelAnimationFrame(context.animationFrame);
    context.animationFrame = null;
  }

  disableFreeCamInputs();

  context.clock.stop();
}

function createRenderer(container: HTMLElement, backgroundColor: string | number): WebGLRenderer {
  const renderer = new WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(new Color(backgroundColor));
  container.appendChild(renderer.domElement);
  return renderer;
}

function createScene(backgroundColor: string | number): Scene {
  const scene = new Scene();
  scene.background = new Color(backgroundColor);
  return scene;
}

function createCameras(aspect: number, travelingStart?: Vector3, freeCamStart?: Vector3) {
  const travelingCamera = new PerspectiveCamera(60, aspect, 0.1, 100);
  travelingCamera.position.copy(travelingStart ?? new Vector3(6, 4, 12));
  travelingCamera.lookAt(new Vector3(0, 1.5, 0));

  const freeCamera = new PerspectiveCamera(75, aspect, 0.1, 500);
  freeCamera.position.copy(freeCamStart ?? new Vector3(0, 2.5, 6));
  freeCamera.lookAt(new Vector3(0, 1.5, 0));

  return { travelingCamera, freeCamera };
}

function createComposer(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: PerspectiveCamera,
  focus: number,
  aperture: number,
  maxBlur: number
) {
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  const { width, height } = renderer.getSize(new Vector2());
  const bokehPass = new BokehPass(scene, camera, {
    focus,
    aperture,
    maxblur: maxBlur,
    width,
    height
  });
  const outputPass = new OutputPass();

  composer.addPass(renderPass);
  composer.addPass(bokehPass);
  composer.addPass(outputPass);

  return { composer, renderPass, bokehPass, outputPass };
}

function ensureContext(container: HTMLElement, options: SceneFlowOptions = {}): SceneFlowContext {
  if (context) {
    return context;
  }

  const resolvedOptions = { ...DEFAULT_OPTIONS, ...options };
  const scene = createScene(resolvedOptions.backgroundColor);
  const renderer = createRenderer(container, resolvedOptions.backgroundColor);
  const { travelingCamera, freeCamera } = createCameras(
    container.clientWidth / container.clientHeight,
    options.travelingStart,
    options.freeCamStart
  );
  const { composer, renderPass, bokehPass, outputPass } = createComposer(
    renderer,
    scene,
    travelingCamera,
    resolvedOptions.focus,
    resolvedOptions.aperture,
    resolvedOptions.maxBlur
  );

  const resizeHandler = () => handleResize();
  window.addEventListener('resize', resizeHandler);

  const selectionLight = new SpotLight('#7a9bff', 1.4, 18, Math.PI / 6, 0.4, 1.2);
  selectionLight.position.set(0, 4, 4);
  selectionLight.target.position.set(0, 1.5, 0);
  scene.add(selectionLight);
  scene.add(selectionLight.target);

  const eventHandlers = registerSceneEvents();

  context = {
    container,
    renderer,
    scene,
    composer,
    renderPass,
    bokehPass,
    outputPass,
    travelingCamera,
    freeCamera,
    freeCamControls: null,
    pointerLockControls: null,
    freeCamKeyState: { forward: false, backward: false, left: false, right: false },
    freeCamInputHandlers: null,
    pointerLockClickHandler: null,
    activeCamera: travelingCamera,
    phase: 'intro',
    selectionTarget: null,
    animationFrame: null,
    resizeHandler,
    resizeObserver: null,
    pendingResize: null,
    clock: new Clock(),
    selectionLight,
    eventHandlers,
    ringModel: null,
    fighterModel: null,
    fighterMixer: null,
    fighterActions: {},
    activeFighterAction: null
  };

  registerEffectsContext({ renderer, composer, bokehPass, outputPass });
  applyRingVisualState(box9Store.getState().ring, { updateEffects: false });
  applyPhaseEffects('intro');

  const resizeObserver = new ResizeObserver(() => handleResize());
  resizeObserver.observe(container);
  context.resizeObserver = resizeObserver;
  handleResize();

  const state = box9Store.getState();

  const ringRequest = ++activeRingRequest;
  assetManager
    .loadRing(state.ring)
    .then((ring) => {
      if (ringRequest !== activeRingRequest) return;
      attachRingModel(ring.scene);
    })
    .catch(() => {});

  preloadRings(state.ring);

  const fighterRequest = ++activeFighterRequest;
  assetManager
    .loadFighter(state.character)
    .then((fighter) => {
      if (fighterRequest !== activeFighterRequest) return;
      attachFighterModel(fighter, state.character);
    })
    .catch(() => {});

  preloadFighters(state.character);

  return context;
}

function setActiveCamera(camera: PerspectiveCamera) {
  if (!context) return;
  context.activeCamera = camera;
  context.renderPass.camera = camera;
  context.bokehPass.camera = camera;
}

function registerSceneEvents(): Record<string, EventListener> {
  const handleCharacterSelected = (event: Event) => {
    const detail = (event as CustomEvent<{ character?: CharacterId }>).detail;
    if (detail?.character) {
      activateSelection(detail.character);
      replaceFighter(detail.character);
    } else {
      replaceFighter(box9Store.getState().character);
    }
  };

  const handlers: Record<string, EventListener> = {
    'box9:start-selection': () => activateSelection(),
    'box9:character-selected': handleCharacterSelected,
    'box9:freecam-change': (event: Event) => {
      const detail = (event as CustomEvent<{ enabled?: boolean }>).detail;
      toggleFreeCamera(detail?.enabled);
    },
    'box9:selection-ended': () => {
      if (!context) return;
      context.selectionTarget = null;
      context.selectionLight?.position.set(0, 4, 4);
      context.selectionLight?.target.position.set(0, 1.5, 0);
    },
    'box9:animation-toggle': (event: Event) => {
      const detail = (event as CustomEvent<{ active?: boolean }>).detail;
      if (detail?.active) {
        ensureAnimationLoop();
      } else {
        stopAnimationLoop();
      }
    },
    'box9:ring-change': (event: Event) => {
      const detail = (event as CustomEvent<{ ring?: RingId }>).detail;
      const nextRing = detail?.ring ?? box9Store.getState().ring;

      if (box9Store.getState().ring !== nextRing) {
        box9Store.setState({ ring: nextRing });
      }

      applyRingVisualState(nextRing);
      applyPhaseEffects(context?.phase ?? 'intro');
      replaceRing(nextRing);
      preloadRings(nextRing);
    }
  };

  Object.entries(handlers).forEach(([name, handler]) => {
    window.addEventListener(name, handler);
  });

  return handlers;
}

function handleResize() {
  if (!context) return;
  const { renderer, container, travelingCamera, freeCamera, composer } = context;
  const width = container.clientWidth;
  const height = container.clientHeight;

  if (!width || !height) {
    if (context.pendingResize === null) {
      context.pendingResize = requestAnimationFrame(() => {
        if (!context) return;
        context.pendingResize = null;
        handleResize();
      });
    }
    return;
  }

  renderer.setSize(width, height);

  travelingCamera.aspect = width / height;
  travelingCamera.updateProjectionMatrix();
  freeCamera.aspect = width / height;
  freeCamera.updateProjectionMatrix();

  composer.setSize(width, height);
}

function animate(_timestamp?: number) {
  if (!context) return;
  const { composer, travelingCamera, phase, clock, freeCamControls } = context;
  const delta = clock.getDelta();
  const elapsed = clock.elapsedTime;

  if (phase === 'intro') {
    travelingCamera.position.x = 8 * Math.cos(elapsed * 0.25);
    travelingCamera.position.z = 8 * Math.sin(elapsed * 0.25);
    travelingCamera.lookAt(0, 1.5, 0);
  } else if (phase === 'selection') {
    if (context.selectionTarget) {
      travelingCamera.position.lerp(context.selectionTarget.camera, 0.08);
      travelingCamera.lookAt(context.selectionTarget.lookAt);

      if (context.selectionLight) {
        context.selectionLight.position.lerp(context.selectionTarget.highlight, 0.12);
        context.selectionLight.target.position.lerp(context.selectionTarget.lookAt, 0.18);
        context.selectionLight.target.updateMatrixWorld();
      }
    } else {
      travelingCamera.position.lerp(new Vector3(0, 3.5, 8), 0.02);
      travelingCamera.lookAt(0, 1.75, 0);
    }
  } else if (phase === 'free') {
    updateFreeCamMovement(delta);
    freeCamControls?.update(delta);
  }

  context.fighterMixer?.update(delta);

  composer.render();
  context.animationFrame = requestAnimationFrame(animate);
}

export function startIntro(container: HTMLElement, options: SceneFlowOptions = {}): void {
  const ctx = ensureContext(container, options);
  ctx.phase = 'intro';
  setActiveCamera(ctx.travelingCamera);
  applyPhaseEffects('intro');
  ensureAnimationLoop();
}

export function enterSelection(): void {
  if (!context) return;
  context.phase = 'selection';
  setActiveCamera(context.travelingCamera);
  applyPhaseEffects('selection');

  if (context.freeCamControls) {
    context.freeCamControls.enabled = false;
  }

  disableFreeCamInputs();
  context.pointerLockControls?.unlock();

  ensureAnimationLoop();
  if (!context.selectionTarget) {
    context.selectionTarget = {
      camera: SELECTION_FOCUS.mma.camera.clone(),
      lookAt: SELECTION_FOCUS.mma.lookAt.clone(),
      highlight: SELECTION_FOCUS.mma.highlight.clone()
    };
  }
}

export function enableFreeCam(): void {
  if (!context) return;
  ensureFreeCamControls();
  context.phase = 'free';
  applyPhaseEffects('free');
  setActiveCamera(context.freeCamera);

  if (context.freeCamControls) {
    context.freeCamControls.enabled = true;
    context.freeCamControls.update();
  }
  enableFreeCamInputs();
  ensureAnimationLoop();
}

export function activateSelection(initialCharacter?: CharacterId): void {
  enterSelection();
  if (initialCharacter) {
    focusOnFighter(initialCharacter);
  }
}

export function confirmCharacterSelection(character: CharacterId): void {
  playPoseAnimation(character);
  window.dispatchEvent(new CustomEvent('box9:character-confirmed', { detail: { character } }));
}

export function toggleFreeCamera(enabled?: boolean): void {
  if (!context) return;
  const enable = enabled ?? context.phase !== 'free';
  if (enable) {
    enableFreeCam();
  } else {
    enterSelection();
  }
}

export function focusOnFighter(character: CharacterId): void {
  if (!context) return;
  applyFighterAnchor(character);
  const target = SELECTION_FOCUS[character];
  context.selectionTarget = {
    camera: target.camera.clone(),
    lookAt: target.lookAt.clone(),
    highlight: target.highlight.clone()
  };
}

export function playIdleAnimation(character: CharacterId): void {
  focusOnFighter(character);
  playFighterAction('idle');
  if (!context?.selectionLight) return;
  context.selectionLight.intensity = 1.35;
}

export function playPoseAnimation(character: CharacterId): void {
  focusOnFighter(character);
  playFighterAction('pose');
  if (!context?.selectionLight) return;
  context.selectionLight.intensity = 1.75;
}

export function loadRing(ring: RingId, hooks?: AssetHooks): Promise<Object3D> {
  const unregister = hooks ? registerAssetHooks(hooks) : null;
  return assetManager
    .loadRing(ring)
    .then((asset) => asset.scene)
    .finally(() => unregister?.());
}

export function loadFighter(character: CharacterId, hooks?: AssetHooks): Promise<LoadedAsset> {
  const unregister = hooks ? registerAssetHooks(hooks) : null;
  return assetManager.loadFighter(character).finally(() => unregister?.());
}

function registerAssetHooks(hooks: AssetHooks) {
  assetHookListeners.add(hooks);
  return () => assetHookListeners.delete(hooks);
}

export function subscribeAssetManager(hooks: AssetHooks): () => void {
  return registerAssetHooks(hooks);
}

function preloadRings(excludeRing?: RingId) {
  const targets = ALL_RINGS.filter((ring) => ring !== excludeRing);
  targets.forEach((ring) => {
    assetManager.loadRing(ring).catch(() => {});
  });
}

function preloadFighters(excludeCharacter?: CharacterId) {
  const targets = ALL_FIGHTERS.filter((character) => character !== excludeCharacter);
  targets.forEach((character) => {
    assetManager.loadFighter(character).catch(() => {});
  });
}

function replaceRing(ring: RingId) {
  const requestId = ++activeRingRequest;
  loadRing(ring)
    .then((model) => {
      if (requestId !== activeRingRequest) return;
      attachRingModel(model);
    })
    .catch(() => {});
}

function replaceFighter(character: CharacterId) {
  const requestId = ++activeFighterRequest;
  resetFighterAnimation();
  loadFighter(character)
    .then((model) => {
      if (requestId !== activeFighterRequest) return;
      attachFighterModel(model, character);
    })
    .catch(() => {});

  preloadFighters(character);
}

function attachRingModel(model: Object3D) {
  if (!context) return;
  disposeAndRemove(context.ringModel);
  positionRing(model);
  context.scene.add(model);
  context.ringModel = model;
  currentRingModel = model;
}

function attachFighterModel(asset: LoadedAsset, character: CharacterId) {
  if (!context) return;
  resetFighterAnimation();
  disposeAndRemove(context.fighterModel);
  const { scene, animations } = asset;
  applyAnchorToModel(scene, character);
  context.scene.add(scene);
  context.fighterModel = scene;
  currentFighterModel = scene;
  setupFighterAnimation(scene, animations);
  playFighterAction('idle');
}

function positionRing(model: Object3D) {
  model.position.set(0, 0, 0);
}

function applyFighterAnchor(character: CharacterId) {
  if (!context?.fighterModel) return;
  applyAnchorToModel(context.fighterModel, character);
}

function applyAnchorToModel(model: Object3D, character: CharacterId) {
  const anchor = FIGHTER_ANCHORS[character];
  if (!anchor) return;
  model.position.copy(anchor.position);
  model.rotation.set(anchor.rotation.x, anchor.rotation.y, anchor.rotation.z);
}

function disposeAndRemove(object: Object3D | null, targetScene: Scene | null = context?.scene ?? null) {
  if (!targetScene || !object) return;
  targetScene.remove(object);
  disposeObject(object);

  if (object === currentRingModel) {
    currentRingModel = null;
  }

  if (object === currentFighterModel) {
    currentFighterModel = null;
  }
}

function disposeObject(object: Object3D) {
  object.traverse((child) => {
    const mesh = child as Mesh;
    if (mesh.isMesh) {
      mesh.geometry?.dispose();
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => {
        if (!material) return;
        disposeMaterialTextures(material as any);
        material.dispose?.();
      });
    }
  });
}

function disposeMaterialTextures(material: any) {
  const textureKeys = [
    'map',
    'normalMap',
    'roughnessMap',
    'metalnessMap',
    'aoMap',
    'emissiveMap',
    'lightMap',
    'bumpMap',
    'alphaMap',
    'specularMap',
    'envMap'
  ];

  textureKeys.forEach((key) => {
    const value = material?.[key];
    if (!value) return;

    if (Array.isArray(value)) {
      value.forEach((texture) => texture?.dispose?.());
    } else {
      value.dispose?.();
    }
  });
}

function resetFighterAnimation() {
  if (!context) return;
  Object.values(context.fighterActions).forEach((action) => action?.stop());
  context.fighterMixer?.stopAllAction();
  if (context.fighterModel) {
    context.fighterMixer?.uncacheRoot(context.fighterModel);
  }
  context.fighterMixer = null;
  context.fighterActions = {};
  context.activeFighterAction = null;
}

function findClip(animations: AnimationClip[], keywords: string[]): AnimationClip | null {
  const lowerKeywords = keywords.map((word) => word.toLowerCase());
  return (
    animations.find((clip) => lowerKeywords.some((keyword) => clip.name.toLowerCase().includes(keyword))) ??
    null
  );
}

function setupFighterAnimation(model: Object3D, animations: AnimationClip[]) {
  if (!context) return;

  const mixer = new AnimationMixer(model);
  const idleClip = findClip(animations, ['idle', 'rest', 'breath']);
  const poseClip = findClip(animations, ['pose', 'victory', 'taunt', 'intro']);

  context.fighterMixer = mixer;
  context.fighterActions = {};
  context.activeFighterAction = null;

  if (idleClip) {
    context.fighterActions.idle = mixer.clipAction(idleClip);
  }

  if (poseClip) {
    context.fighterActions.pose = mixer.clipAction(poseClip);
  }
}

function playFighterAction(type: 'idle' | 'pose') {
  if (!context?.fighterMixer) return;

  const action = context.fighterActions[type];
  if (!action) return;

  Object.values(context.fighterActions).forEach((otherAction) => {
    if (otherAction && otherAction !== action) {
      otherAction.stop();
    }
  });

  action.reset().play();
  context.activeFighterAction = action;
}

function ensureFreeCamControls() {
  if (!context) return;

  if (!context.freeCamControls) {
    const controls = new OrbitControls(context.freeCamera, context.renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1.5, 0);
    controls.enabled = false;
    context.freeCamControls = controls;
  }

  if (!context.pointerLockControls) {
    const pointerLock = new PointerLockControls(context.freeCamera, context.renderer.domElement);
    pointerLock.addEventListener('lock', () => {
      if (!context) return;
      if (context.freeCamControls) {
        context.freeCamControls.enabled = false;
      }
    });
    pointerLock.addEventListener('unlock', () => {
      if (!context) return;
      if (context.freeCamControls) {
        context.freeCamControls.enabled = true;
      }
      context.freeCamKeyState = { forward: false, backward: false, left: false, right: false };
    });
    context.pointerLockControls = pointerLock;
  }
}

function enableFreeCamInputs() {
  if (!context || context.freeCamInputHandlers) return;

  const handleKeydown = (event: KeyboardEvent) => {
    switch (event.key.toLowerCase()) {
      case 'w':
        context!.freeCamKeyState.forward = true;
        break;
      case 's':
        context!.freeCamKeyState.backward = true;
        break;
      case 'a':
        context!.freeCamKeyState.left = true;
        break;
      case 'd':
        context!.freeCamKeyState.right = true;
        break;
      default:
        break;
    }
  };

  const handleKeyup = (event: KeyboardEvent) => {
    switch (event.key.toLowerCase()) {
      case 'w':
        context!.freeCamKeyState.forward = false;
        break;
      case 's':
        context!.freeCamKeyState.backward = false;
        break;
      case 'a':
        context!.freeCamKeyState.left = false;
        break;
      case 'd':
        context!.freeCamKeyState.right = false;
        break;
      default:
        break;
    }
  };

  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('keyup', handleKeyup);
  context.freeCamInputHandlers = { keydown: handleKeydown, keyup: handleKeyup };

  if (!context.pointerLockClickHandler) {
    const clickHandler = () => context?.pointerLockControls?.lock();
    context.renderer.domElement.addEventListener('click', clickHandler);
    context.pointerLockClickHandler = clickHandler;
  }
}

function disableFreeCamInputs() {
  if (!context) return;

  if (context.freeCamInputHandlers) {
    window.removeEventListener('keydown', context.freeCamInputHandlers.keydown);
    window.removeEventListener('keyup', context.freeCamInputHandlers.keyup);
    context.freeCamInputHandlers = null;
  }

  if (context.pointerLockClickHandler) {
    context.renderer.domElement.removeEventListener('click', context.pointerLockClickHandler);
    context.pointerLockClickHandler = null;
  }

  context.pointerLockControls?.unlock();
  context.freeCamKeyState = { forward: false, backward: false, left: false, right: false };
}

function updateFreeCamMovement(delta: number) {
  if (!context?.pointerLockControls || !context.pointerLockControls.isLocked) return;

  const { freeCamKeyState, pointerLockControls } = context;
  const speed = 6;
  const distance = speed * delta;

  if (freeCamKeyState.forward) pointerLockControls.moveForward(distance);
  if (freeCamKeyState.backward) pointerLockControls.moveForward(-distance);
  if (freeCamKeyState.left) pointerLockControls.moveRight(-distance);
  if (freeCamKeyState.right) pointerLockControls.moveRight(distance);
}

export function destroy(): void {
  if (!context) return;

  const scene = context.scene;

  if (context.animationFrame !== null) {
    cancelAnimationFrame(context.animationFrame);
    context.animationFrame = null;
  }

  if (context.resizeHandler) {
    window.removeEventListener('resize', context.resizeHandler);
  }

  if (context.resizeObserver) {
    context.resizeObserver.disconnect();
  }

  if (context.pendingResize !== null) {
    cancelAnimationFrame(context.pendingResize);
  }

  Object.entries(context.eventHandlers).forEach(([name, handler]) => {
    window.removeEventListener(name, handler);
  });

  disposeAndRemove(context.ringModel, scene);
  resetFighterAnimation();
  disposeAndRemove(context.fighterModel, scene);
  context.ringModel = null;
  context.fighterModel = null;

  context.composer.dispose();
  context.renderer.dispose();

  context.freeCamControls?.dispose();

  if (context.selectionLight) {
    context.scene.remove(context.selectionLight);
    context.scene.remove(context.selectionLight.target);
  }

  if (context.renderer.domElement.parentElement === context.container) {
    context.container.removeChild(context.renderer.domElement);
  }

  assetHookListeners.clear();

  context = null;
  currentRingModel = null;
  currentFighterModel = null;
}
