import { emitFightWin, normalizeProgress, recordFightWin } from './progression';
import type { Box9Store, CharacterId } from './state';
import { box9Store } from './state';

type FightIntegrationWindow = Window & {
  box9RegisterWin?: (opponentId: CharacterId) => void;
};

function resolveOpponent(opponentId: CharacterId): CharacterId | null {
  if (opponentId === 'mma' || opponentId === 'bodybuilder' || opponentId === 'tyson' || opponentId === 'principal') {
    return opponentId;
  }
  console.warn('[box9] box9RegisterWin recibió un oponente inválido:', opponentId);
  return null;
}

export function attachFightIntegration(store: Box9Store = box9Store): () => void {
  const integrationWindow = window as FightIntegrationWindow;

  const registerWin = (opponentId: CharacterId) => {
    const opponent = resolveOpponent(opponentId);
    if (!opponent) return;

    const progress = recordFightWin(store, opponent);
    // Aseguramos que el progreso propagado está normalizado y refrescamos UI dependientes.
    const normalizedProgress = normalizeProgress(progress);
    emitFightWin(opponent, { source: 'integration', progress: normalizedProgress });
  };

  integrationWindow.box9RegisterWin = registerWin;

  return () => {
    if (integrationWindow.box9RegisterWin === registerWin) {
      delete integrationWindow.box9RegisterWin;
    }
  };
}
