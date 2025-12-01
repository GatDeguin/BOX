import {
  Color,
  Clock,
  PerspectiveCamera,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer
} from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';

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
  animationFrame: number | null;
  resizeHandler: (() => void) | null;
  clock: Clock;
}

const DEFAULT_OPTIONS: Required<Pick<SceneFlowOptions, 'backgroundColor' | 'focus' | 'aperture' | 'maxBlur'>> = {
  backgroundColor: '#05070c',
  focus: 10,
  aperture: 0.025,
  maxBlur: 0.01
};

let context: SceneFlowContext | null = null;

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
    animationFrame: null,
    resizeHandler,
    clock: new Clock()
  };

  return context;
}

function setActiveCamera(camera: PerspectiveCamera) {
  if (!context) return;
  context.activeCamera = camera;
  context.renderPass.camera = camera;
  context.bokehPass.camera = camera;
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
    travelingCamera.position.lerp(new Vector3(0, 3.5, 8), 0.02);
    travelingCamera.lookAt(0, 1.75, 0);
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

  if (ctx.animationFrame === null) {
    ctx.clock.start();
    ctx.animationFrame = requestAnimationFrame(animate);
  }
}

export function enterSelection(): void {
  if (!context) return;
  context.phase = 'selection';
  setActiveCamera(context.travelingCamera);
}

export function enableFreeCam(): void {
  if (!context) return;
  context.phase = 'free';
  setActiveCamera(context.freeCamera);
}

export function destroy(): void {
  if (!context) return;

  if (context.animationFrame !== null) {
    cancelAnimationFrame(context.animationFrame);
  }

  if (context.resizeHandler) {
    window.removeEventListener('resize', context.resizeHandler);
  }

  context.composer.dispose();
  context.renderer.dispose();

  if (context.renderer.domElement.parentElement === context.container) {
    context.container.removeChild(context.renderer.domElement);
  }

  context = null;
}
