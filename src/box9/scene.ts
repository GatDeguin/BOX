import {
  Color,
  Clock,
  Mesh,
  Object3D,
  PerspectiveCamera,
  Scene,
  SpotLight,
  Vector2,
  Vector3,
  WebGLRenderer
} from 'three';
import { AssetHooks, AssetManager } from './assets';
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
  phase: ScenePhase;
  selectionTarget: SelectionTarget | null;
  animationFrame: number | null;
  resizeHandler: (() => void) | null;
  clock: Clock;
  selectionLight: SpotLight | null;
  eventHandlers: Record<string, EventListener>;
  ringModel: Object3D | null;
  fighterModel: Object3D | null;
}

interface SelectionTarget {
  camera: Vector3;
  lookAt: Vector3;
  highlight: Vector3;
}

const SELECTION_FOCUS: Record<CharacterId, SelectionTarget> = {
  striker: {
    camera: new Vector3(-3.5, 2.8, 8),
    lookAt: new Vector3(-1.5, 1.8, 0),
    highlight: new Vector3(-1.5, 2.5, 0)
  },
  brawler: {
    camera: new Vector3(0, 3.1, 8.5),
    lookAt: new Vector3(0, 1.8, 0),
    highlight: new Vector3(0, 2.5, 0)
  },
  counter: {
    camera: new Vector3(3.5, 2.8, 8),
    lookAt: new Vector3(1.5, 1.8, 0),
    highlight: new Vector3(1.5, 2.5, 0)
  }
};

const DEFAULT_OPTIONS: Required<Pick<SceneFlowOptions, 'backgroundColor' | 'focus' | 'aperture' | 'maxBlur'>> = {
  backgroundColor: '#05070c',
  focus: 10,
  aperture: 0.025,
  maxBlur: 0.01
};

const PHASE_EFFECTS: Record<ScenePhase, EffectProfileName> = {
  intro: 'neon',
  selection: 'gimnasio',
  free: 'neon'
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

function applyPhaseEffects(phase: ScenePhase) {
  const profile = PHASE_EFFECTS[phase];
  applyEffects(profile);
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
    activeCamera: travelingCamera,
    phase: 'intro',
    selectionTarget: null,
    animationFrame: null,
    resizeHandler,
    clock: new Clock(),
    selectionLight,
    eventHandlers,
    ringModel: null,
    fighterModel: null
  };

  registerEffectsContext({ renderer, composer, bokehPass, outputPass });
  applyPhaseEffects('intro');

  const state = box9Store.getState();
  loadRing(state.ring).then((ring) => attachRingModel(ring));
  loadFighter(state.character).then((fighter) => attachFighterModel(fighter, state.character));

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
    'box9:animation-toggle': (event: Event) => {
      const detail = (event as CustomEvent<{ active?: boolean }>).detail;
      if (detail?.active) {
        ensureAnimationLoop();
      } else {
        stopAnimationLoop();
      }
    },
    'box9:ring-change': () => {
      const state = box9Store.getState();
      replaceRing(state.ring);
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
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  renderer.setSize(width, height);

  travelingCamera.aspect = width / height;
  travelingCamera.updateProjectionMatrix();
  freeCamera.aspect = width / height;
  freeCamera.updateProjectionMatrix();

  composer.setSize(width, height);
}

function animate(_timestamp?: number) {
  if (!context) return;
  const { composer, travelingCamera, freeCamera, phase, clock } = context;
  const elapsed = clock.getElapsedTime();

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
    freeCamera.lookAt(0, 1.5, 0);
  }

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

  ensureAnimationLoop();
  if (!context.selectionTarget) {
    context.selectionTarget = {
      camera: SELECTION_FOCUS.striker.camera.clone(),
      lookAt: SELECTION_FOCUS.striker.lookAt.clone(),
      highlight: SELECTION_FOCUS.striker.highlight.clone()
    };
  }
}

export function enableFreeCam(): void {
  if (!context) return;
  context.phase = 'free';
  applyPhaseEffects('free');
  setActiveCamera(context.freeCamera);
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
  const target = SELECTION_FOCUS[character];
  context.selectionTarget = {
    camera: target.camera.clone(),
    lookAt: target.lookAt.clone(),
    highlight: target.highlight.clone()
  };
}

export function playIdleAnimation(character: CharacterId): void {
  focusOnFighter(character);
  if (!context?.selectionLight) return;
  context.selectionLight.intensity = 1.35;
}

export function playPoseAnimation(character: CharacterId): void {
  focusOnFighter(character);
  if (!context?.selectionLight) return;
  context.selectionLight.intensity = 1.75;
}

export function loadRing(ring: RingId, hooks?: AssetHooks): Promise<Object3D> {
  const unregister = hooks ? registerAssetHooks(hooks) : null;
  return assetManager.loadRing(ring).finally(() => unregister?.());
}

export function loadFighter(character: CharacterId, hooks?: AssetHooks): Promise<Object3D> {
  const unregister = hooks ? registerAssetHooks(hooks) : null;
  return assetManager.loadFighter(character).finally(() => unregister?.());
}

function registerAssetHooks(hooks: AssetHooks) {
  assetHookListeners.add(hooks);
  return () => assetHookListeners.delete(hooks);
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
  loadFighter(character)
    .then((model) => {
      if (requestId !== activeFighterRequest) return;
      attachFighterModel(model, character);
    })
    .catch(() => {});
}

function attachRingModel(model: Object3D) {
  if (!context) return;
  disposeAndRemove(context.ringModel);
  positionRing(model);
  context.scene.add(model);
  context.ringModel = model;
}

function attachFighterModel(model: Object3D, character: CharacterId) {
  if (!context) return;
  disposeAndRemove(context.fighterModel);
  positionFighter(model, character);
  context.scene.add(model);
  context.fighterModel = model;
}

function positionRing(model: Object3D) {
  model.position.set(0, 0, 0);
}

function positionFighter(model: Object3D, character: CharacterId) {
  const target = SELECTION_FOCUS[character];
  model.position.set(target.lookAt.x, 0, target.lookAt.z);
}

function disposeAndRemove(object: Object3D | null) {
  if (!context || !object) return;
  context.scene.remove(object);
  disposeObject(object);
}

function disposeObject(object: Object3D) {
  object.traverse((child) => {
    const mesh = child as Mesh;
    if (mesh.isMesh) {
      mesh.geometry?.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material) => material.dispose?.());
      } else {
        mesh.material?.dispose?.();
      }
    }
  });
}

export function destroy(): void {
  if (!context) return;

  if (context.animationFrame !== null) {
    cancelAnimationFrame(context.animationFrame);
  }

  if (context.resizeHandler) {
    window.removeEventListener('resize', context.resizeHandler);
  }

  Object.entries(context.eventHandlers).forEach(([name, handler]) => {
    window.removeEventListener(name, handler);
  });

  disposeAndRemove(context.ringModel);
  disposeAndRemove(context.fighterModel);

  context.composer.dispose();
  context.renderer.dispose();

  if (context.selectionLight) {
    context.scene.remove(context.selectionLight);
    context.scene.remove(context.selectionLight.target);
  }

  if (context.renderer.domElement.parentElement === context.container) {
    context.container.removeChild(context.renderer.domElement);
  }

  context = null;
}
