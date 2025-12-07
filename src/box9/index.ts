import { attachProgressPersistence } from './persistence';
import { startIntro } from './scene';
import { box9Store, CharacterId, getDefaultRingForCharacter } from './state';
import { initBox9UI } from './ui';
import { initCampaignSelectionView } from './ui-campaign-selection';
import { registerProgressionTriggers, normalizeProgress } from './progression';
import { initBox9Options } from './ui-options';
import type { Box9ModeId } from './ui-modes';
import { createModeOverlay } from './ui-modes';

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
  let teardownCampaign: (() => void) | null = null;
  let modeOverlay: { overlay: HTMLElement; update: (progress: ReturnType<typeof normalizeProgress>) => void } | null = null;

  const showExperience = () => {
    hero.style.display = 'none';
    experience.style.display = 'block';
  };

  const ensureScene = () => {
    if (sceneInitialized) return;
    sceneInitialized = true;
    startIntro(canvasContainer);
  };

  const mountModeOverlay = () => {
    const { overlay, update } = createModeOverlay(store, (mode) => {
      window.dispatchEvent(new CustomEvent('box9:mode-selected', { detail: { mode } }));
    });

    modeOverlay = { overlay, update };
    uiRoot.innerHTML = '';
    uiRoot.appendChild(overlay);
  };

  const ensureModeOverlay = () => {
    if (!modeOverlay) {
      mountModeOverlay();
    }
  };

  const openCampaign = () => {
    ensureScene();
    uiRoot.innerHTML = '';
    modeOverlay = null;
    teardownCampaign?.();
    teardownCampaign = initCampaignSelectionView(uiRoot, store);
  };

  const routeMode = (mode: Box9ModeId = 'campaign') => {
    const progress = normalizeProgress(store.getState().progress);
    showExperience();

    switch (mode) {
      case 'campaign': {
        openCampaign();
        break;
      }
      case 'bolsa': {
        ensureScene();
        uiRoot.innerHTML = '';
        window.dispatchEvent(
          new CustomEvent('box9:start-bag-mode', { detail: { progress, unlocks: progress.unlocks } })
        );
        break;
      }
      case 'dummy': {
        ensureScene();
        uiRoot.innerHTML = '';
        window.dispatchEvent(
          new CustomEvent('box9:open-dummy-scene', { detail: { progress, unlocks: progress.unlocks } })
        );
        break;
      }
    }
  };

  const handleStart = () => {
    showExperience();
    ensureModeOverlay();
  };

  const handleOptions = () => {
    showExperience();
    ensureModeOverlay();
    optionsController.open();
  };

  startButton.addEventListener('click', handleStart);
  optionsButton.addEventListener('click', handleOptions);

  window.addEventListener('box9:mode-selected', (event: Event) => {
    const detail = (event as CustomEvent<{ mode?: Box9ModeId }>).detail;
    routeMode(detail?.mode ?? 'campaign');
  });

  window.addEventListener('box9:start-fight', (event: Event) => {
    const detail = (event as CustomEvent<{ character?: CharacterId }>).detail;
    showExperience();
    ensureScene();
    uiRoot.innerHTML = '';

    if (!uiInitialized) {
      initBox9UI(uiRoot, store);
      uiInitialized = true;
    }

    const opponent = detail?.character ?? store.getState().character;
    const state = store.getState();
    const preferredRing = getDefaultRingForCharacter(opponent);
    const ringOverride = state.ringOverride ?? null;
    const resolvedRing = ringOverride ?? preferredRing;
    const previousRing = state.ring;

    store.setState({
      character: opponent,
      selectionStarted: true,
      ring: resolvedRing,
      ringOverride
    });

    if (previousRing !== resolvedRing) {
      window.dispatchEvent(new CustomEvent('box9:ring-change', { detail: { ring: resolvedRing } }));
    }

    const progress = normalizeProgress(store.getState().progress);
    window.dispatchEvent(
      new CustomEvent('box9:start-selection', { detail: { progress, unlocks: progress.unlocks } })
    );
  });

  window.addEventListener('box9:go-modes', () => {
    teardownCampaign?.();
    teardownCampaign = null;
    mountModeOverlay();
    const progress = normalizeProgress(store.getState().progress);
    modeOverlay?.update(progress);
  });

  store.subscribe((state) => {
    if (!modeOverlay) return;
    modeOverlay.update(normalizeProgress(state.progress));
  });

  ensureModeOverlay();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
} else {
  bootstrap();
}
