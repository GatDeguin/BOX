import { buildProgressView } from './progress-view';
import { box9Store, Box9Store } from './state';

export function createProgressPanel(store: Box9Store = box9Store) {
  const panel = document.createElement('div');
  panel.className = 'box9-progress-panel';

  const header = document.createElement('div');
  header.className = 'box9-progress-header';

  const title = document.createElement('div');
  title.className = 'box9-progress-title';
  const titleLabel = document.createElement('strong');
  titleLabel.textContent = 'Ruta de guantes';
  const subtitle = document.createElement('small');
  subtitle.textContent = 'Campaña y desbloqueos';
  title.append(titleLabel, subtitle);

  const milestone = document.createElement('p');
  milestone.className = 'box9-progress-milestone';

  header.append(title);

  const bar = document.createElement('div');
  bar.className = 'box9-progress';
  const barFill = document.createElement('div');
  barFill.className = 'box9-progress-bar';
  bar.appendChild(barFill);

  const barMeta = document.createElement('div');
  barMeta.className = 'box9-progress-meta';
  const barLabel = document.createElement('small');
  barMeta.appendChild(barLabel);

  const gloveList = document.createElement('div');
  gloveList.className = 'box9-progress-gloves';

  panel.append(header, milestone, bar, barMeta, gloveList);

  const render = () => {
    const view = buildProgressView(store.getState().progress);
    milestone.textContent = view.milestone;
    barFill.style.width = `${view.secretProgress.percentage}%`;
    barLabel.textContent = view.secretProgress.unlocked
      ? 'Ruta secreta completada'
      : `${view.secretProgress.percentage}% hacia los guantes secretos (${view.secretProgress.completed}/${view.secretProgress.total})`;

    gloveList.innerHTML = '';
    view.gloves.forEach((glove) => {
      const card = document.createElement('article');
      card.className = 'box9-glove-card';
      if (glove.equipped) card.classList.add('active');
      if (!glove.unlocked) card.classList.add('locked');

      const header = document.createElement('div');
      header.className = 'box9-glove-header';
      const title = document.createElement('h3');
      title.className = 'box9-glove-title';
      title.textContent = glove.label;
      const status = document.createElement('span');
      status.className = 'box9-glove-status ' + (glove.equipped ? 'active' : glove.unlocked ? 'unlocked' : 'locked');
      status.textContent = glove.equipped ? 'Equipado' : glove.unlocked ? 'Desbloqueado' : 'Bloqueado';
      header.append(title, status);

      const requirements = document.createElement('ul');
      requirements.className = 'box9-glove-reqs';
      glove.requirements.forEach((req) => {
        const item = document.createElement('li');
        item.textContent = req.description;
        if (req.done) item.classList.add('done');
        requirements.appendChild(item);
      });

      card.append(header, requirements);
      gloveList.appendChild(card);
    });
  };

  const handleProgressUpdated = () => render();
  window.addEventListener('box9:progress-updated', handleProgressUpdated);
  const unsubscribe = store.subscribe(() => render());
  render();

  return {
    panel,
    update: render,
    destroy: () => {
      window.removeEventListener('box9:progress-updated', handleProgressUpdated);
      unsubscribe();
      panel.remove();
    }
  } as const;
}
