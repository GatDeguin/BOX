import { normalizeProgress } from './progression';
import { Box9Store, ProgressionState } from './state';

const PROGRESS_STORAGE_KEY = 'box9:progress';

function loadPersistedProgress(): ProgressionState | null {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as ProgressionState;
    return normalizeProgress(parsed);
  } catch (error) {
    console.warn('No se pudo leer el progreso guardado de Box9.', error);
    return null;
  }
}

function persistProgress(progress: ProgressionState): void {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.warn('No se pudo guardar el progreso de Box9.', error);
  }
}

export function attachProgressPersistence(store: Box9Store): Box9Store {
  const persisted = loadPersistedProgress();
  if (persisted) {
    store.setState({ progress: persisted });
  }

  let previousProgress = store.getState().progress;

  store.subscribe((state) => {
    if (state.progress === previousProgress) return;
    previousProgress = state.progress;
    persistProgress(state.progress);
  });

  return store;
}
