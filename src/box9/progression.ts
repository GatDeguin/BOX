import { Box9Store, CharacterId, GloveLevel, ProgressionState, box9Store } from './state';

const INITIAL_WINS: Record<CharacterId, number> = {
  mma: 0,
  bodybuilder: 0,
  tyson: 0
};

const GLOVE_LABELS: Record<GloveLevel, string> = {
  entrenamiento: 'Guantes de entrenamiento',
  pro: 'Guantes Pro',
  secreto: 'Guantes secretos'
};

function cloneWins(wins: Record<CharacterId, number>): Record<CharacterId, number> {
  return {
    mma: wins.mma ?? 0,
    bodybuilder: wins.bodybuilder ?? 0,
    tyson: wins.tyson ?? 0
  };
}

function deriveTysonUnlock(wins: Record<CharacterId, number>): boolean {
  return wins.mma > 0 && wins.bodybuilder > 0;
}

function deriveSecretUnlock(wins: Record<CharacterId, number>): boolean {
  return wins.tyson > 0;
}

function deriveGloveLevel(progress: ProgressionState): GloveLevel {
  if (progress.secretUnlocked) return 'secreto';
  if (progress.tysonUnlocked) return 'pro';
  return 'entrenamiento';
}

export function normalizeProgress(progress?: ProgressionState): ProgressionState {
  const wins = cloneWins(progress?.wins ?? INITIAL_WINS);
  const tysonUnlocked = progress?.tysonUnlocked ?? deriveTysonUnlock(wins);
  const secretUnlocked = progress?.secretUnlocked ?? deriveSecretUnlock(wins);
  const gloveLevel = deriveGloveLevel({ wins, tysonUnlocked, secretUnlocked, gloveLevel: progress?.gloveLevel ?? 'entrenamiento' });

  return {
    wins,
    tysonUnlocked: tysonUnlocked || deriveTysonUnlock(wins),
    secretUnlocked: secretUnlocked || deriveSecretUnlock(wins),
    gloveLevel
  };
}

export function canFightCharacter(character: CharacterId, progress: ProgressionState): boolean {
  if (character === 'tyson') {
    return progress.tysonUnlocked;
  }
  return true;
}

export function getFightLockReason(character: CharacterId, progress: ProgressionState): string | null {
  if (character === 'tyson' && !progress.tysonUnlocked) {
    const remaining = [] as string[];
    if (progress.wins.mma <= 0) remaining.push('derrotar al peleador MMA');
    if (progress.wins.bodybuilder <= 0) remaining.push('derrotar al Bodybuilder');
    if (remaining.length === 0) return 'Necesitas completar el circuito base para desbloquear a Tyson.';
    return `Debes ${remaining.join(' y ')} antes de retar a Tyson.`;
  }
  return null;
}

export function nextMilestone(progress: ProgressionState): string {
  if (!progress.tysonUnlocked) {
    return 'Gana contra MMA y Bodybuilder para liberar la ruta a Tyson.';
  }
  if (!progress.secretUnlocked) {
    return 'Vence a Tyson para activar los guantes secretos.';
  }
  return 'Ruta secreta desbloqueada: guantes secretos activos.';
}

export function recordFightWin(store: Box9Store, opponent: CharacterId): ProgressionState {
  const current = normalizeProgress(store.getState().progress);
  const wins = cloneWins(current.wins);
  wins[opponent] = (wins[opponent] ?? 0) + 1;

  const tysonUnlocked = current.tysonUnlocked || deriveTysonUnlock(wins);
  const secretUnlocked = current.secretUnlocked || deriveSecretUnlock(wins);
  const gloveLevel = deriveGloveLevel({ wins, tysonUnlocked, secretUnlocked, gloveLevel: current.gloveLevel });

  const next = { wins, tysonUnlocked, secretUnlocked, gloveLevel };
  store.setState({ progress: next });
  return next;
}

export function getGloveLabel(level: GloveLevel): string {
  return GLOVE_LABELS[level] ?? level;
}

export function registerProgressionTriggers(store: Box9Store = box9Store): () => void {
  const onFightWin = (event: Event) => {
    const detail = (event as CustomEvent<{ opponent?: CharacterId }>).detail;
    if (!detail?.opponent) return;
    recordFightWin(store, detail.opponent);
  };

  window.addEventListener('box9:fight-win', onFightWin);

  return () => {
    window.removeEventListener('box9:fight-win', onFightWin);
  };
}
