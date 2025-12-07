import { getGloveLabel, nextMilestone, normalizeProgress } from './progression';
import { Box9Store } from './state';

export type Box9ModeId = 'seleccion' | 'bolsa' | 'dummy';

interface ModeOption {
  id: Box9ModeId;
  title: string;
  description: string;
  hint: string;
}

const MODE_OPTIONS: ModeOption[] = [
  {
    id: 'seleccion',
    title: 'Modo campaña',
    description: 'Elige rival, ring y activa el travelling guiado del combate.',
    hint: 'Disponible siempre'
  },
  {
    id: 'bolsa',
    title: 'Bolsa de golpeo',
    description: 'Monta la bolsa de boxeo para calentar y practicar combinaciones.',
    hint: 'Perfecto para probar animaciones'
  },
  {
    id: 'dummy',
    title: 'Dummy secreto',
    description: 'Sparring de precisión para guantes negros/dorados y rutas secretas.',
    hint: 'Requiere desbloquear el set secreto'
  }
];

function dispatchOpenGloves() {
  window.dispatchEvent(new CustomEvent('box9:open-gloves'));
}

function dispatchModeSelected(mode: Box9ModeId) {
  window.dispatchEvent(
    new CustomEvent('box9:mode-selected', {
      detail: { mode }
    })
  );
}

export function createModeOverlay(
  store: Box9Store,
  onModeSelected: (mode: Box9ModeId) => void
): { overlay: HTMLElement; update: (progress: ReturnType<typeof normalizeProgress>) => void } {
  const overlay = document.createElement('div');
  overlay.className = 'box9-mode-overlay';

  const layout = document.createElement('div');
  layout.className = 'box9-mode-layout';

  const header = document.createElement('div');
  header.className = 'box9-mode-header';

  const title = document.createElement('h1');
  title.textContent = 'Neon Boxing · Modos';

  const subtitle = document.createElement('p');
  subtitle.textContent = 'Elige cómo quieres entrar: campaña, bolsa o el dummy secreto.';
  subtitle.className = 'box9-mode-subtitle';

  header.append(title, subtitle);

  const grid = document.createElement('div');
  grid.className = 'box9-mode-grid';
  const buttons = new Map<Box9ModeId, HTMLButtonElement>();
  const cards = new Map<Box9ModeId, HTMLElement>();

  MODE_OPTIONS.forEach((mode) => {
    const card = document.createElement('article');
    card.className = 'box9-mode-card';

    const cardTitle = document.createElement('h2');
    cardTitle.textContent = mode.title;

    const description = document.createElement('p');
    description.textContent = mode.description;
    description.className = 'box9-mode-description';

    const hint = document.createElement('div');
    hint.className = 'box9-mode-hint';
    hint.textContent = mode.hint;

    const lock = document.createElement('span');
    lock.className = 'box9-mode-lock';
    lock.textContent = 'Bloqueado';

    const actions = document.createElement('div');
    actions.className = 'box9-mode-actions';

    const button = document.createElement('button');
    button.className = 'box9-button';
    button.textContent = mode.id === 'seleccion' ? 'Entrar al ring' : 'Activar modo';
    button.addEventListener('click', () => {
      const progress = normalizeProgress(store.getState().progress);
      if (mode.id === 'dummy' && !progress.unlocks.secreto) return;
      dispatchModeSelected(mode.id);
      onModeSelected(mode.id);
    });

    actions.appendChild(button);
    card.append(cardTitle, description, hint, actions, lock);
    grid.appendChild(card);
    buttons.set(mode.id, button);
    cards.set(mode.id, card);
  });

  const sidebar = document.createElement('aside');
  sidebar.className = 'box9-mode-sidebar';

  const sidebarTitle = document.createElement('h3');
  sidebarTitle.textContent = 'Progresión';

  const gloveMeta = document.createElement('p');
  gloveMeta.className = 'box9-mode-meta';
  const gloveLabel = document.createElement('strong');
  gloveLabel.className = 'box9-mode-meta-value';
  gloveMeta.append('Guante activo: ', gloveLabel);

  const milestone = document.createElement('p');
  milestone.className = 'box9-mode-milestone';

  const gloveButton = document.createElement('button');
  gloveButton.className = 'box9-button box9-ghost';
  gloveButton.textContent = 'Ver guantes';
  gloveButton.addEventListener('click', () => dispatchOpenGloves());

  sidebar.append(sidebarTitle, gloveMeta, milestone, gloveButton);

  layout.append(header, grid, sidebar);
  overlay.appendChild(layout);

  const update = (progress: ReturnType<typeof normalizeProgress>) => {
    const dummyCard = cards.get('dummy');
    const dummyButton = buttons.get('dummy');
    const dummyLocked = !progress.unlocks.secreto;

    if (dummyCard && dummyButton) {
      dummyCard.classList.toggle('locked', dummyLocked);
      dummyButton.disabled = dummyLocked;
      dummyButton.textContent = dummyLocked ? 'Bloqueado' : 'Probar dummy';
    }

    gloveLabel.textContent = getGloveLabel(progress.activeGlove);
    milestone.textContent = nextMilestone(progress);
  };

  update(normalizeProgress(store.getState().progress));

  return { overlay, update };
}
