import { box9Store, Box9Store, RingId, CharacterId } from './state';
import { getFighterDetails, initSelectionControls } from './selection';
import { subscribeAssetManager } from './scene';
import { BOX9_ASSET_SECTIONS } from './inventory';
import { getGloveLabel, nextMilestone, normalizeProgress } from './progression';

const ringOptions: Record<RingId, string> = {
  mmaGym: 'Gimnasio MMA',
  bodybuilderArena: 'Arena Bodybuilder',
  tysonRing: 'Ring Tyson'
};

const characterOptions: Record<CharacterId, string> = {
  mma: 'MMA',
  bodybuilder: 'Bodybuilder',
  tyson: 'Tyson'
};

function emitSceneEvent(name: string, detail?: unknown) {
  window.dispatchEvent(new CustomEvent(`box9:${name}`, { detail }));
}

function createStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .box9-ui { position: absolute; inset: 0; pointer-events: none; font-family: 'Inter', system-ui, sans-serif; color: #e9ecf4; }
    .box9-overlay { position: absolute; inset: 0; background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent), #030508; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; pointer-events: auto; }
    .box9-overlay h1 { letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700; margin: 0; color: #f6f7fb; }
    .box9-overlay p { margin: 0; color: #b4bed4; }
    .box9-button { border: 1px solid #3f5cff; background: linear-gradient(135deg, #3f5cff, #7a9bff); color: #fff; border-radius: 10px; padding: 10px 16px; font-weight: 700; cursor: pointer; box-shadow: 0 10px 30px rgba(63, 92, 255, 0.3); transition: transform 120ms ease, box-shadow 120ms ease; }
    .box9-button:hover { transform: translateY(-1px); box-shadow: 0 14px 40px rgba(63, 92, 255, 0.35); }
    .box9-hud { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; pointer-events: none; padding: 16px; }
    .box9-row { display: flex; align-items: center; gap: 8px; }
    .box9-topbar { display: flex; justify-content: space-between; align-items: center; pointer-events: auto; }
    .box9-chip { border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); border-radius: 999px; padding: 8px 12px; cursor: pointer; transition: background 120ms ease, border-color 120ms ease; }
    .box9-chip.active { background: rgba(63, 92, 255, 0.18); border-color: #7a9bff; color: #fff; }
    .box9-chip.disabled { opacity: 0.55; cursor: not-allowed; border-style: dashed; }
    .box9-chip-label { font-weight: 700; font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase; }
    .box9-status { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px; pointer-events: auto; min-width: 220px; }
    .box9-status small { color: #9aa3ba; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; }
    .box9-status strong { color: #f6f7fb; }
    .box9-progress-note { color: #b4bed4; font-size: 13px; line-height: 1.4; }
    .box9-warning { position: absolute; left: 50%; bottom: 18px; transform: translateX(-50%); background: rgba(255, 107, 129, 0.16); border: 1px solid rgba(255, 107, 129, 0.45); color: #ffd4dc; padding: 10px 14px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); pointer-events: none; opacity: 0; transition: opacity 160ms ease; max-width: 520px; text-align: center; }
    .box9-fighter-card { background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 14px 16px; display: grid; gap: 8px; max-width: 320px; pointer-events: auto; box-shadow: 0 18px 50px rgba(0,0,0,0.45); }
    .box9-fighter-name { margin: 0; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 800; color: #e9ecf4; }
    .box9-stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .box9-stat { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 8px 10px; display: flex; flex-direction: column; gap: 4px; }
    .box9-stat small { color: #9aa3ba; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; }
    .box9-stat strong { color: #f6f7fb; }
    .box9-fighter-personality { margin: 0; color: #b4bed4; line-height: 1.5; }
    .box9-modal-backdrop { position: absolute; inset: 0; background: rgba(3,5,8,0.65); display: none; align-items: center; justify-content: center; pointer-events: auto; }
    .box9-modal { background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 18px; width: min(420px, 90vw); box-shadow: 0 18px 80px rgba(0,0,0,0.45); }
    .box9-modal h2 { margin: 0 0 12px; letter-spacing: 0.06em; text-transform: uppercase; }
    .box9-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
    .box9-field label { font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: #9aa3ba; font-weight: 700; }
    .box9-field select, .box9-field input[type="checkbox"] { padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); color: #fff; }
    .box9-modal-actions { display: flex; justify-content: flex-end; gap: 8px; }
    .box9-secondary { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); color: #e9ecf4; }
    .box9-loading { position: absolute; inset: 0; display: none; align-items: center; justify-content: center; pointer-events: none; }
    .box9-loading-panel { background: rgba(5, 7, 12, 0.85); border: 1px solid rgba(122,155,255,0.35); border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; min-width: 240px; box-shadow: 0 10px 36px rgba(0,0,0,0.4); pointer-events: auto; }
    .box9-loading strong { letter-spacing: 0.06em; text-transform: uppercase; font-size: 12px; color: #e9ecf4; }
    .box9-progress { height: 8px; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); }
    .box9-progress-bar { height: 100%; width: 0; background: linear-gradient(135deg, #3f5cff, #7a9bff); transition: width 140ms ease; }
    .box9-error { color: #ffb7b7; font-size: 12px; }
    .box9-asset-list { display: grid; gap: 12px; max-height: min(60vh, 520px); overflow: auto; padding-right: 4px; }
    .box9-asset-section { border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.03); border-radius: 12px; padding: 12px 14px; }
    .box9-asset-section h3 { margin: 0 0 8px; letter-spacing: 0.06em; text-transform: uppercase; font-size: 13px; color: #e9ecf4; }
    .box9-asset-section ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
    .box9-asset-section li { color: #dce2f5; line-height: 1.4; font-size: 14px; }
    .box9-asset-section small { display: block; color: #9aa3ba; font-size: 12px; }
  `;
  document.head.appendChild(style);
}

function createOverlay(onStart: () => void) {
  const overlay = document.createElement('div');
  overlay.className = 'box9-overlay';

  const title = document.createElement('h1');
  title.textContent = 'Neon Boxing';

  const subtitle = document.createElement('p');
  subtitle.textContent = 'Inicia la secuencia y elige tu esquina.';

  const button = document.createElement('button');
  button.className = 'box9-button';
  button.textContent = 'Entrar al ring';
  button.addEventListener('click', () => onStart());

  overlay.append(title, subtitle, button);
  return overlay;
}

function createModal(onClose: () => void, onApply: (ring: RingId, freeCamera: boolean) => void) {
  const backdrop = document.createElement('div');
  backdrop.className = 'box9-modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'box9-modal';

  const heading = document.createElement('h2');
  heading.textContent = 'Opciones de arena';

  const ringField = document.createElement('div');
  ringField.className = 'box9-field';
  const ringLabel = document.createElement('label');
  ringLabel.textContent = 'Ring';
  const ringSelect = document.createElement('select');
  Object.entries(ringOptions).forEach(([value, label]) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    ringSelect.appendChild(option);
  });
  ringField.append(ringLabel, ringSelect);

  const freeCamField = document.createElement('div');
  freeCamField.className = 'box9-field';
  const freeCamLabel = document.createElement('label');
  freeCamLabel.textContent = 'Cámara libre';
  const freeCamToggle = document.createElement('input');
  freeCamToggle.type = 'checkbox';
  freeCamField.append(freeCamLabel, freeCamToggle);

  const actions = document.createElement('div');
  actions.className = 'box9-modal-actions';
  const cancelButton = document.createElement('button');
  cancelButton.className = 'box9-button box9-secondary';
  cancelButton.textContent = 'Cerrar';
  cancelButton.addEventListener('click', () => onClose());

  const applyButton = document.createElement('button');
  applyButton.className = 'box9-button';
  applyButton.textContent = 'Aplicar';
  applyButton.addEventListener('click', () => {
    onApply(ringSelect.value as RingId, freeCamToggle.checked);
    onClose();
  });

  actions.append(cancelButton, applyButton);
  modal.append(heading, ringField, freeCamField, actions);
  backdrop.appendChild(modal);

  return { backdrop, ringSelect, freeCamToggle };
}

function createLoadingOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'box9-loading';

  const panel = document.createElement('div');
  panel.className = 'box9-loading-panel';

  const title = document.createElement('strong');
  title.textContent = 'Cargando assets';

  const progress = document.createElement('div');
  progress.className = 'box9-progress';
  const progressBar = document.createElement('div');
  progressBar.className = 'box9-progress-bar';
  progress.appendChild(progressBar);

  const errorText = document.createElement('div');
  errorText.className = 'box9-error';
  errorText.style.display = 'none';

  panel.append(title, progress, errorText);
  overlay.appendChild(panel);

  return { overlay, progressBar, errorText };
}

function createAssetModal(onClose: () => void) {
  const backdrop = document.createElement('div');
  backdrop.className = 'box9-modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'box9-modal';

  const heading = document.createElement('h2');
  heading.textContent = 'Inventario de assets';

  const description = document.createElement('p');
  description.className = 'box9-progress-note';
  description.textContent = 'Listado de modelos, animaciones, texturas y sonidos disponibles en BOX9.';

  const sectionList = document.createElement('div');
  sectionList.className = 'box9-asset-list';

  BOX9_ASSET_SECTIONS.forEach((section) => {
    const sectionCard = document.createElement('div');
    sectionCard.className = 'box9-asset-section';

    const title = document.createElement('h3');
    title.textContent = section.title;

    const list = document.createElement('ul');

    section.items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item.label;
      if (item.detail) {
        const small = document.createElement('small');
        small.textContent = item.detail;
        li.appendChild(small);
      }
      list.appendChild(li);
    });

    sectionCard.append(title, list);
    sectionList.appendChild(sectionCard);
  });

  const actions = document.createElement('div');
  actions.className = 'box9-modal-actions';

  const closeButton = document.createElement('button');
  closeButton.className = 'box9-button box9-secondary';
  closeButton.textContent = 'Cerrar';
  closeButton.addEventListener('click', () => onClose());

  actions.append(closeButton);
  modal.append(heading, description, sectionList, actions);
  backdrop.appendChild(modal);

  return { backdrop };
}

function createHud(
  store: Box9Store,
  onOpenModal: () => void,
  onOpenAssets: () => void,
  onToggleFreeCam: () => void,
  onSelectCharacter: (character: CharacterId) => void
) {
  const hud = document.createElement('div');
  hud.className = 'box9-hud';

  const topBar = document.createElement('div');
  topBar.className = 'box9-topbar';

  const status = document.createElement('div');
  status.className = 'box9-status';

  const ringLine = document.createElement('div');
  const ringLabel = document.createElement('small');
  ringLabel.textContent = 'Ring';
  const ringValue = document.createElement('strong');
  ringLine.append(ringLabel, ringValue);

  const gloveLine = document.createElement('div');
  const gloveLabel = document.createElement('small');
  gloveLabel.textContent = 'Guantes';
  const gloveValue = document.createElement('strong');
  gloveLine.append(gloveLabel, gloveValue);

  const cameraLine = document.createElement('div');
  const cameraLabel = document.createElement('small');
  cameraLabel.textContent = 'Cámara';
  const cameraValue = document.createElement('strong');
  cameraLine.append(cameraLabel, cameraValue);

  status.append(ringLine, gloveLine, cameraLine);

  const actions = document.createElement('div');
  actions.className = 'box9-row';

  const freeCamButton = document.createElement('button');
  freeCamButton.className = 'box9-button box9-secondary';
  freeCamButton.textContent = 'Cam. libre';
  freeCamButton.addEventListener('click', () => onToggleFreeCam());

  const optionsButton = document.createElement('button');
  optionsButton.className = 'box9-button';
  optionsButton.textContent = 'Opciones';
  optionsButton.addEventListener('click', () => onOpenModal());

  const assetsButton = document.createElement('button');
  assetsButton.className = 'box9-button';
  assetsButton.textContent = 'Assets';
  assetsButton.addEventListener('click', () => onOpenAssets());

  actions.append(freeCamButton, optionsButton, assetsButton);
  topBar.append(status, actions);

  const chipsRow = document.createElement('div');
  chipsRow.className = 'box9-row';
  const chipLabel = document.createElement('small');
  chipLabel.textContent = 'Fichas';
  chipLabel.style.textTransform = 'uppercase';
  chipLabel.style.letterSpacing = '0.1em';
  chipLabel.style.color = '#9aa3ba';
  chipLabel.style.fontWeight = '700';
  chipsRow.appendChild(chipLabel);

  const chipList = document.createElement('div');
  chipList.className = 'box9-row';
  chipList.style.flexWrap = 'wrap';

  const setActiveChip = (selectedCharacter: CharacterId) => {
    const chips = chipList.querySelectorAll<HTMLElement>('.box9-chip');
    chips.forEach((chip) => {
      chip.classList.toggle('active', chip.dataset.character === selectedCharacter);
    });
  };

  Object.entries(characterOptions).forEach(([id, label]) => {
    const chip = document.createElement('div');
    chip.className = 'box9-chip';
    const chipText = document.createElement('span');
    chipText.className = 'box9-chip-label';
    chipText.textContent = label;
    chip.appendChild(chipText);
    chip.addEventListener('click', () => {
      const character = id as CharacterId;
      setActiveChip(character);
      onSelectCharacter(character);
    });
    chip.dataset.character = id;
    chipList.appendChild(chip);
  });

  chipsRow.appendChild(chipList);
  const fighterCard = document.createElement('div');
  fighterCard.className = 'box9-fighter-card';

  const fighterName = document.createElement('h3');
  fighterName.className = 'box9-fighter-name';
  fighterName.textContent = 'MMA';

  const statGrid = document.createElement('div');
  statGrid.className = 'box9-stat-grid';

  const weightStat = document.createElement('div');
  weightStat.className = 'box9-stat';
  const weightLabel = document.createElement('small');
  weightLabel.textContent = 'Peso';
  const weightValue = document.createElement('strong');
  weightStat.append(weightLabel, weightValue);

  const reachStat = document.createElement('div');
  reachStat.className = 'box9-stat';
  const reachLabel = document.createElement('small');
  reachLabel.textContent = 'Alcance';
  const reachValue = document.createElement('strong');
  reachStat.append(reachLabel, reachValue);

  const speedStat = document.createElement('div');
  speedStat.className = 'box9-stat';
  const speedLabel = document.createElement('small');
  speedLabel.textContent = 'Velocidad';
  const speedValue = document.createElement('strong');
  speedStat.append(speedLabel, speedValue);

  statGrid.append(weightStat, reachStat, speedStat);
  fighterCard.append(fighterName, statGrid);
  const fighterPersonality = document.createElement('p');
  fighterPersonality.className = 'box9-fighter-personality';
  fighterPersonality.textContent = 'Competidor táctico, mezcla derribos con boxeo limpio y lee cada distancia.';
  fighterCard.appendChild(fighterPersonality);

  const progressNote = document.createElement('div');
  progressNote.className = 'box9-progress-note';
  progressNote.textContent = 'Completa las peleas base para desbloquear a Tyson y los guantes secretos.';

  const winsRow = document.createElement('div');
  winsRow.className = 'box9-row';
  winsRow.style.justifyContent = 'space-between';

  const winsMMA = document.createElement('small');
  const winsBodybuilder = document.createElement('small');
  const winsTyson = document.createElement('small');
  [winsMMA, winsBodybuilder, winsTyson].forEach((el) => {
    el.style.color = '#b4bed4';
    el.style.fontWeight = '700';
    el.style.letterSpacing = '0.06em';
  });

  winsRow.append(winsMMA, winsBodybuilder, winsTyson);
  fighterCard.append(progressNote, winsRow);
  hud.append(topBar, chipsRow, fighterCard);

  const update = () => {
    const state = store.getState();
    const progress = normalizeProgress(state.progress);
    ringValue.textContent = ringOptions[state.ring];
    cameraValue.textContent = state.freeCamera ? 'Libre' : 'Viaje guiado';
    gloveValue.textContent = getGloveLabel(progress.activeGlove);

    const fighter = getFighterDetails(state.character);
    fighterName.textContent = fighter.name;
    weightValue.textContent = fighter.weight;
    reachValue.textContent = fighter.reach;
    speedValue.textContent = fighter.speed;
    fighterPersonality.textContent = fighter.personality;

    setActiveChip(state.character);

    winsMMA.textContent = `Entrenamiento → MMA: ${progress.wins.entrenamiento.mma} · Bodybuilder: ${progress.wins.entrenamiento.bodybuilder}`;
    winsBodybuilder.textContent = `Amateur → MMA: ${progress.wins.amateur.mma} · Bodybuilder: ${progress.wins.amateur.bodybuilder}`;
    winsTyson.textContent = `PRO → MMA: ${progress.wins.pro.mma} · Bodybuilder: ${progress.wins.pro.bodybuilder} · Tyson: ${progress.wins.pro.tyson}`;
    progressNote.textContent = nextMilestone(progress);

    chipList.querySelectorAll<HTMLElement>('.box9-chip').forEach((chip) => {
      const id = chip.dataset.character as CharacterId;
      const locked = id === 'tyson' && !progress.unlocks.tyson;
      chip.classList.toggle('disabled', locked);
      chip.title = locked ? 'Desbloquéalo ganando las peleas base.' : '';
    });
  };

  return { hud, update, ringValue, cameraValue, freeCamButton };
}

export function initBox9UI(root: HTMLElement, store: Box9Store = box9Store) {
  createStyles();

  const container = document.createElement('div');
  container.className = 'box9-ui';

  const { overlay: loadingOverlay, progressBar, errorText } = createLoadingOverlay();
  const progressByUrl = new Map<string, number>();
  let loadingHideTimeout: number | null = null;

  const refreshLoadingOverlay = () => {
    if (loadingHideTimeout !== null) {
      window.clearTimeout(loadingHideTimeout);
      loadingHideTimeout = null;
    }

    if (progressByUrl.size === 0) {
      loadingOverlay.style.display = 'none';
      errorText.style.display = 'none';
      progressBar.style.width = '0%';
      return;
    }

    const values = Array.from(progressByUrl.values());
    const average = values.reduce((sum, value) => sum + value, 0) / values.length;
    progressBar.style.width = `${Math.round(average * 100)}%`;
    loadingOverlay.style.display = 'flex';
  };

  const scheduleHideOverlay = () => {
    if (loadingHideTimeout !== null) return;
    loadingHideTimeout = window.setTimeout(() => {
      progressByUrl.clear();
      refreshLoadingOverlay();
    }, 450);
  };

  subscribeAssetManager({
    onProgress: (url, ratio) => {
      progressByUrl.set(url, ratio);
      errorText.style.display = 'none';
      refreshLoadingOverlay();
      if (Array.from(progressByUrl.values()).every((value) => value >= 1)) {
        scheduleHideOverlay();
      }
    },
    onError: (url) => {
      progressByUrl.delete(url);
      errorText.textContent = `No se pudo cargar ${url}.`;
      errorText.style.display = 'block';
      loadingOverlay.style.display = 'flex';
    }
  });

  const overlay = createOverlay(() => {
    store.setState({ selectionStarted: true });
    emitSceneEvent('start-selection');
  });

  const helpPanels = Array.from(document.querySelectorAll<HTMLElement>('[data-box9-help]'));
  const cardPanels = Array.from(document.querySelectorAll<HTMLElement>('[data-box9-card]'));

  const { backdrop, ringSelect, freeCamToggle } = createModal(
    () => {
      backdrop.style.display = 'none';
    },
    (ring, freeCamera) => {
      store.setState({ ring, freeCamera });
      emitSceneEvent('ring-change', { ring });
      emitSceneEvent('freecam-change', { enabled: freeCamera });
    }
  );

  const { backdrop: assetBackdrop } = createAssetModal(() => {
    assetBackdrop.style.display = 'none';
  });

  const { hud, update: updateHud } = createHud(
    store,
    () => {
      const state = store.getState();
      ringSelect.value = state.ring;
      freeCamToggle.checked = state.freeCamera;
      backdrop.style.display = 'flex';
    },
    () => {
      assetBackdrop.style.display = 'flex';
    },
    () => {
      const next = !store.getState().freeCamera;
      store.setState({ freeCamera: next });
      emitSceneEvent('freecam-change', { enabled: next });
    },
    (character) => {
      store.setState({ character });
      emitSceneEvent('character-selected', { character });
    }
  );

  const lockWarning = document.createElement('div');
  lockWarning.className = 'box9-warning';
  container.appendChild(lockWarning);

  let lockWarningTimeout: number | null = null;
  const showLockWarning = (message: string) => {
    lockWarning.textContent = message;
    lockWarning.style.opacity = '1';
    if (lockWarningTimeout !== null) {
      window.clearTimeout(lockWarningTimeout);
    }
    lockWarningTimeout = window.setTimeout(() => {
      lockWarning.style.opacity = '0';
      lockWarningTimeout = null;
    }, 2200);
  };

  window.addEventListener('box9:character-locked', (event) => {
    const detail = (event as CustomEvent<{ character?: CharacterId; reason?: string }>).detail;
    if (!detail?.character) return;
    showLockWarning(detail.reason ?? 'Necesitas más victorias para desbloquear este combate.');
  });

  let lastSelectionStarted = store.getState().selectionStarted;

  store.subscribe((state) => {
    overlay.style.display = state.selectionStarted ? 'none' : 'flex';
    hud.style.display = state.selectionStarted ? 'flex' : 'none';
    updateHud();

    if (state.selectionStarted !== lastSelectionStarted) {
      emitSceneEvent('animation-toggle', { active: state.selectionStarted });
      if (!state.selectionStarted && lastSelectionStarted) {
        emitSceneEvent('selection-ended');
      }
      lastSelectionStarted = state.selectionStarted;
    }

    helpPanels.forEach((panel) => {
      panel.style.display = state.selectionStarted ? 'none' : '';
      panel.toggleAttribute('aria-hidden', state.selectionStarted);
    });

    cardPanels.forEach((panel) => {
      panel.style.display = state.selectionStarted ? '' : 'none';
      panel.toggleAttribute('aria-hidden', !state.selectionStarted);
    });
  });

  container.append(overlay, hud, backdrop, assetBackdrop, loadingOverlay);
  root.appendChild(container);
  initSelectionControls(store, {
    onStartSelection: (character) => {
      emitSceneEvent('start-selection', { character });
    },
    onConfirmSelection: (character) => {
      emitSceneEvent('character-selected', { character });
      emitSceneEvent('animation-toggle', { active: false });
    },
    onIdle: (character) => {
      emitSceneEvent('character-selected', { character });
    }
  });
}
