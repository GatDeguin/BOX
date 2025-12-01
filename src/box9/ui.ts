import { box9Store, Box9Store, RingId, CharacterId } from './state';
import { getFighterDetails, initSelectionControls } from './selection';

const ringOptions: Record<RingId, string> = {
  classic: 'Ring clásico',
  neon: 'Dojo neón',
  rooftop: 'Azotea nocturna'
};

const characterOptions: Record<CharacterId, string> = {
  striker: 'Striker',
  brawler: 'Brawler',
  counter: 'Counter'
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
    .box9-chip-label { font-weight: 700; font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase; }
    .box9-status { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px; pointer-events: auto; min-width: 220px; }
    .box9-status small { color: #9aa3ba; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; }
    .box9-status strong { color: #f6f7fb; }
    .box9-fighter-card { background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 14px 16px; display: grid; gap: 8px; max-width: 320px; pointer-events: auto; box-shadow: 0 18px 50px rgba(0,0,0,0.45); }
    .box9-fighter-name { margin: 0; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 800; color: #e9ecf4; }
    .box9-stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .box9-stat { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 8px 10px; display: flex; flex-direction: column; gap: 4px; }
    .box9-stat small { color: #9aa3ba; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; }
    .box9-stat strong { color: #f6f7fb; }
    .box9-modal-backdrop { position: absolute; inset: 0; background: rgba(3,5,8,0.65); display: none; align-items: center; justify-content: center; pointer-events: auto; }
    .box9-modal { background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 18px; width: min(420px, 90vw); box-shadow: 0 18px 80px rgba(0,0,0,0.45); }
    .box9-modal h2 { margin: 0 0 12px; letter-spacing: 0.06em; text-transform: uppercase; }
    .box9-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
    .box9-field label { font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: #9aa3ba; font-weight: 700; }
    .box9-field select, .box9-field input[type="checkbox"] { padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); color: #fff; }
    .box9-modal-actions { display: flex; justify-content: flex-end; gap: 8px; }
    .box9-secondary { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); color: #e9ecf4; }
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

function createHud(
  store: Box9Store,
  onOpenModal: () => void,
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

  const cameraLine = document.createElement('div');
  const cameraLabel = document.createElement('small');
  cameraLabel.textContent = 'Cámara';
  const cameraValue = document.createElement('strong');
  cameraLine.append(cameraLabel, cameraValue);

  status.append(ringLine, cameraLine);

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

  actions.append(freeCamButton, optionsButton);
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
  fighterName.textContent = 'Striker';

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
  hud.append(topBar, chipsRow, fighterCard);

  const update = () => {
    const state = store.getState();
    ringValue.textContent = ringOptions[state.ring];
    cameraValue.textContent = state.freeCamera ? 'Libre' : 'Viaje guiado';

    const fighter = getFighterDetails(state.character);
    fighterName.textContent = fighter.name;
    weightValue.textContent = fighter.weight;
    reachValue.textContent = fighter.reach;
    speedValue.textContent = fighter.speed;

    setActiveChip(state.character);
  };

  return { hud, update, ringValue, cameraValue, freeCamButton };
}

export function initBox9UI(root: HTMLElement, store: Box9Store = box9Store) {
  createStyles();

  const container = document.createElement('div');
  container.className = 'box9-ui';

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

  const { hud, update: updateHud } = createHud(
    store,
    () => {
      const state = store.getState();
      ringSelect.value = state.ring;
      freeCamToggle.checked = state.freeCamera;
      backdrop.style.display = 'flex';
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

  let lastSelectionStarted = store.getState().selectionStarted;

  store.subscribe((state) => {
    overlay.style.display = state.selectionStarted ? 'none' : 'flex';
    hud.style.display = state.selectionStarted ? 'flex' : 'none';
    updateHud();

    if (state.selectionStarted !== lastSelectionStarted) {
      emitSceneEvent('animation-toggle', { active: state.selectionStarted });
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

  container.append(overlay, hud, backdrop);
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
