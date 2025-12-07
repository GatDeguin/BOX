import { attachProgressPersistence } from './persistence';
import { startIntro } from './scene';
import { box9Store } from './state';
import { initBox9UI } from './ui';
import { registerProgressionTriggers } from './progression';

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
  registerProgressionTriggers(store);

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

  startButton.addEventListener('click', handleStart);
  optionsButton.addEventListener('click', handleStart);

  window.addEventListener('box9:mode-selected', () => {
    showExperience();
    ensureScene();
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
