import { buildGloveViewModel } from './gloves';
import { box9Store, Box9Store } from './state';

export function createHudGloveChip(store: Box9Store = box9Store) {
  const chip = document.createElement('div');
  chip.className = 'box9-chip';

  const chipText = document.createElement('span');
  chipText.className = 'box9-chip-label';
  chip.appendChild(chipText);

  const render = () => {
    const gloves = buildGloveViewModel(store.getState().progress);
    const active = gloves.find((glove) => glove.equipped);
    chipText.textContent = active ? `Guantes: ${active.label}` : 'Guantes: n/d';
  };

  chip.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('box9:open-gloves'));
  });

  const handleProgressUpdated = () => render();
  window.addEventListener('box9:progress-updated', handleProgressUpdated);
  const unsubscribe = store.subscribe(() => render());

  render();

  return {
    chip,
    destroy: () => {
      window.removeEventListener('box9:progress-updated', handleProgressUpdated);
      unsubscribe();
      chip.remove();
    }
  } as const;
}
