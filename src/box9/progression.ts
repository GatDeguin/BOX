import { Box9Store, CharacterId, GloveLevel, ProgressionState, WinLedger, box9Store } from './state';

const INITIAL_WINS: WinLedger = {
  entrenamiento: { mma: 0, bodybuilder: 0, tyson: 0, principal: 0 },
  amateur: { mma: 0, bodybuilder: 0, tyson: 0, principal: 0 },
  pro: { mma: 0, bodybuilder: 0, tyson: 0, principal: 0 },
  secreto: { mma: 0, bodybuilder: 0, tyson: 0, principal: 0 }
};

const GLOVE_LABELS: Record<GloveLevel, string> = {
  entrenamiento: 'Guantes de entrenamiento',
  amateur: 'Guantes amateur',
  pro: 'Guantes Pro',
  secreto: 'Guantes secretos'
};

function cloneWins(wins: WinLedger): WinLedger {
  return {
    entrenamiento: { ...INITIAL_WINS.entrenamiento, ...wins.entrenamiento },
    amateur: { ...INITIAL_WINS.amateur, ...wins.amateur },
    pro: { ...INITIAL_WINS.pro, ...wins.pro },
    secreto: { ...INITIAL_WINS.secreto, ...wins.secreto }
  };
}

function deriveUnlocks(wins: WinLedger) {
  const amateur = wins.entrenamiento.mma > 0 && wins.entrenamiento.bodybuilder > 0;
  const tyson = amateur && wins.amateur.mma > 0 && wins.amateur.bodybuilder > 0;
  const pro = tyson && wins.amateur.tyson > 0;
  const secreto = pro && wins.pro.mma > 0 && wins.pro.bodybuilder > 0 && wins.pro.tyson > 0;

  return { amateur, tyson, pro, secreto } as const;
}

function deriveActiveGlove(current: GloveLevel, unlocks: ProgressionState['unlocks']): GloveLevel {
  const isUnlocked = (level: GloveLevel) => {
    if (level === 'entrenamiento') return true;
    if (level === 'amateur') return unlocks.amateur;
    if (level === 'pro') return unlocks.pro;
    return unlocks.secreto;
  };

  if (isUnlocked(current)) return current;
  if (unlocks.secreto) return 'secreto';
  if (unlocks.pro) return 'pro';
  if (unlocks.amateur) return 'amateur';
  return 'entrenamiento';
}

export function normalizeProgress(progress?: ProgressionState): ProgressionState {
  const wins = cloneWins(progress?.wins ?? INITIAL_WINS);
  const unlocks = deriveUnlocks(wins);
  const activeGlove = deriveActiveGlove(progress?.activeGlove ?? 'entrenamiento', unlocks);

  return {
    wins,
    unlocks,
    activeGlove
  };
}

export function canFightCharacter(character: CharacterId, progress: ProgressionState): boolean {
  if (character === 'tyson') {
    return progress.unlocks.tyson;
  }
  return true;
}

export function getFightLockReason(character: CharacterId, progress: ProgressionState): string | null {
  if (character === 'tyson' && !progress.unlocks.tyson) {
    const remaining = [] as string[];
    if (progress.wins.entrenamiento.mma <= 0 || progress.wins.entrenamiento.bodybuilder <= 0) {
      remaining.push('completar las victorias base (guantes de entrenamiento)');
    }
    if (progress.wins.amateur.mma <= 0) remaining.push('derrotar a MMA con guantes amateur');
    if (progress.wins.amateur.bodybuilder <= 0) remaining.push('derrotar al Bodybuilder con guantes amateur');
    return `Para retar a Tyson debes ${remaining.join(' y ')}.`;
  }
  return null;
}

export function nextMilestone(progress: ProgressionState): string {
  if (!progress.unlocks.amateur) {
    return 'Gana una vez a MMA y Bodybuilder con guantes de entrenamiento para obtener los guantes amateur.';
  }
  if (!progress.unlocks.tyson) {
    return 'Repite las victorias con guantes amateur para abrir el desafío contra Tyson.';
  }
  if (!progress.unlocks.pro) {
    return 'Vence a Tyson con guantes amateur para obtener los guantes PRO.';
  }
  if (!progress.unlocks.secreto) {
    return 'Gana de nuevo a todos usando los guantes PRO para revelar los guantes secretos.';
  }
  return 'Ruta secreta completada: guantes negros y dorados equipados.';
}

export function recordFightWin(store: Box9Store, opponent: CharacterId): ProgressionState {
  const current = normalizeProgress(store.getState().progress);
  const wins = cloneWins(current.wins);
  const ledger = wins[current.activeGlove];
  ledger[opponent] = (ledger[opponent] ?? 0) + 1;

  const unlocks = deriveUnlocks(wins);
  const activeGlove = deriveActiveGlove(current.activeGlove, unlocks);

  const next = { wins, unlocks, activeGlove };
  store.setState({ progress: next });
  return next;
}

export function emitFightWin(opponent: CharacterId) {
  window.dispatchEvent(
    new CustomEvent('box9:fight-win', {
      detail: { opponent }
    })
  );
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
