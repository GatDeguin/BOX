import { buildGloveViewModel, GloveView } from './gloves';
import { equipGlove, normalizeProgress } from './progression';
import { box9Store, Box9Store } from './state';

function renderRequirements(container: HTMLElement, glove: GloveView) {
  container.innerHTML = '';
  const list = document.createElement('ul');
  list.className = 'box9-glove-reqs';

  glove.requirements.forEach((requirement) => {
    const item = document.createElement('li');
    item.textContent = requirement.description;
    item.className = requirement.done ? 'done' : '';
    list.appendChild(item);
  });

  container.appendChild(list);
}

function renderCards(list: HTMLElement, gloves: GloveView[], store: Box9Store) {
  list.innerHTML = '';

  gloves.forEach((glove) => {
    const card = document.createElement('article');
    card.className = 'box9-glove-card';
    if (!glove.unlocked) card.classList.add('locked');
    if (glove.equipped) card.classList.add('active');

    const header = document.createElement('div');
    header.className = 'box9-glove-header';

    const title = document.createElement('h3');
    title.className = 'box9-glove-title';
    title.textContent = glove.label;

    const status = document.createElement('span');
    status.className = 'box9-glove-status ' + (glove.equipped ? 'active' : glove.unlocked ? 'unlocked' : 'locked');
    status.textContent = glove.equipped ? 'Equipado' : glove.unlocked ? 'Desbloqueado' : 'Bloqueado';

    header.append(title, status);

    const requirements = document.createElement('div');
    requirements.className = 'box9-glove-requirements';
    renderRequirements(requirements, glove);

    const actions = document.createElement('div');
    actions.className = 'box9-row';

    const equipButton = document.createElement('button');
    equipButton.className = 'box9-button box9-secondary';
    equipButton.textContent = glove.equipped ? `${glove.label} equipados` : `Equipar ${glove.label}`;
    equipButton.disabled = glove.equipped || !glove.unlocked;
    if (!glove.equipped && glove.unlocked) {
      equipButton.addEventListener('click', () => {
        equipGlove(store, glove.level);
      });
    } else {
      equipButton.style.display = 'none';
    }

    actions.appendChild(equipButton);

    card.append(header, requirements, actions);
    list.appendChild(card);
  });
}

export function attachGloveModal(store: Box9Store = box9Store, root: HTMLElement = document.body) {
  const backdrop = document.createElement('div');
  backdrop.className = 'box9-modal-backdrop';
  backdrop.style.display = 'none';

  const modal = document.createElement('div');
  modal.className = 'box9-modal box9-glove-modal';

  const heading = document.createElement('h2');
  heading.textContent = 'Progresión de guantes';

  const description = document.createElement('p');
  description.className = 'box9-progress-note';
  description.textContent = 'Consulta el estado de cada set y equipa el que prefieras.';

  const list = document.createElement('div');
  list.className = 'box9-glove-list';

  const actions = document.createElement('div');
  actions.className = 'box9-modal-actions';
  const closeButton = document.createElement('button');
  closeButton.className = 'box9-button box9-secondary';
  closeButton.textContent = 'Cerrar';
  closeButton.addEventListener('click', () => {
    backdrop.style.display = 'none';
  });
  actions.appendChild(closeButton);

  modal.append(heading, description, list, actions);
  backdrop.appendChild(modal);
  root.appendChild(backdrop);

  const render = () => {
    const progress = normalizeProgress(store.getState().progress);
    const gloves = buildGloveViewModel(progress);
    renderCards(list, gloves, store);
  };

  const open = () => {
    render();
    backdrop.style.display = 'flex';
  };

  const handleOpen = () => open();
  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === backdrop) {
      backdrop.style.display = 'none';
    }
  };
  const handleProgressUpdated = () => {
    if (backdrop.style.display !== 'none') {
      render();
    }
  };

  backdrop.addEventListener('click', handleBackdropClick);
  window.addEventListener('box9:open-gloves', handleOpen);
  window.addEventListener('box9:progress-updated', handleProgressUpdated);

  const unsubscribe = store.subscribe((state) => {
    if (backdrop.style.display !== 'none') {
      renderCards(list, buildGloveViewModel(state.progress), store);
    }
  });

  return {
    backdrop,
    destroy: () => {
      window.removeEventListener('box9:open-gloves', handleOpen);
      window.removeEventListener('box9:progress-updated', handleProgressUpdated);
      backdrop.removeEventListener('click', handleBackdropClick);
      unsubscribe();
      backdrop.remove();
    }
  } as const;
}
