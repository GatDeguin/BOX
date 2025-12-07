import { attachProgressPersistence } from './persistence';
import { startIntro } from './scene';
import { box9Store } from './state';
import { initBox9UI } from './ui';
import { registerProgressionTriggers, normalizeProgress } from './progression';
import { initBox9Options } from './ui-options';
import type { Box9ModeId } from './ui-modes';

function getRequiredElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`No se encontró el elemento obligatorio "${selector}".`);
  }
  return element;
}

function bootstrap() {
  const hero = getRequiredElement<HTMLElement>('[data-box9-hero]');
  const startButton = getRequiredElement<HTMLButtonElement>('[data-box9-start]');
  const optionsButton = getRequiredElement<HTMLButtonElement>('[data-box9-options]');
  const experience = getRequiredElement<HTMLElement>('#box9-experience');
  const canvasContainer = getRequiredElement<HTMLElement>('#canvas-container');
  const uiRoot = getRequiredElement<HTMLElement>('#box9-ui-root');

  const store = attachProgressPersistence(box9Store);
  store.setState({ progress: normalizeProgress(store.getState().progress) });
  registerProgressionTriggers(store);
  const optionsController = initBox9Options();

  let uiInitialized = false;
  let sceneInitialized = false;

  const showExperience = () => {
    if (!uiInitialized) {
      initBox9UI(uiRoot, store);
      uiInitialized = true;
    }

    hero.style.display = 'none';
    experience.style.display = 'block';
  };

  const ensureScene = () => {
    if (sceneInitialized) return;
    sceneInitialized = true;
    startIntro(canvasContainer);
  };

  const handleStart = () => {
    showExperience();
  };

  const handleOptions = () => {
    showExperience();
    optionsController.open();
  };

  startButton.addEventListener('click', handleStart);
  optionsButton.addEventListener('click', handleOptions);

  const routeMode = (mode: Box9ModeId = 'seleccion') => {
    const progress = normalizeProgress(store.getState().progress);
    showExperience();

    switch (mode) {
      case 'seleccion': {
        ensureScene();
        window.dispatchEvent(
          new CustomEvent('box9:start-selection', { detail: { progress, unlocks: progress.unlocks } })
        );
        break;
      }
      case 'bolsa': {
        ensureScene();
        window.dispatchEvent(
          new CustomEvent('box9:start-bag-mode', { detail: { progress, unlocks: progress.unlocks } })
        );
        break;
      }
      case 'dummy': {
        ensureScene();
        window.dispatchEvent(
          new CustomEvent('box9:open-dummy-scene', { detail: { progress, unlocks: progress.unlocks } })
        );
        break;
      }
    }
  };

  window.addEventListener('box9:mode-selected', (event: Event) => {
    const detail = (event as CustomEvent<{ mode?: Box9ModeId }>).detail;
    routeMode(detail?.mode ?? 'seleccion');
  });

  window.addEventListener('box9:start-selection', () => {
    showExperience();
    ensureScene();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
} else {
  bootstrap();
}
