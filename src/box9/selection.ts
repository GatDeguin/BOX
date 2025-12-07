import { box9Store, Box9Store, CharacterId, getDefaultRingForCharacter } from './state';
import { canFightCharacter, getFightLockReason, normalizeProgress } from './progression';
import { activateSelection, confirmCharacterSelection, playIdleAnimation } from './scene';

export interface FighterDetails {
  id: CharacterId;
  name: string;
  weight: string;
  reach: string;
  speed: string;
  personality: string;
}

const fighters: FighterDetails[] = [
  {
    id: 'mma',
    name: 'MMA',
    weight: '84 kg',
    reach: '193 cm',
    speed: 'Versátil',
    personality: 'Competidor táctico, mezcla derribos con boxeo limpio y lee cada distancia.'
  },
  {
    id: 'bodybuilder',
    name: 'Bodybuilder',
    weight: '102 kg',
    reach: '185 cm',
    speed: 'Potente',
    personality: 'Fuerza bruta y presencia dominante, avanza firme buscando golpes demoledores.'
  },
  {
    id: 'tyson',
    name: 'Tyson',
    weight: '97 kg',
    reach: '180 cm',
    speed: 'Explosiva',
    personality: 'Agresividad pura, combina desplazamientos bajos con ganchos veloces al mentón.'
  },
  {
    id: 'principal',
    name: 'Principal',
    weight: '94 kg',
    reach: '188 cm',
    speed: 'Precisa',
    personality: 'Boxeador técnico de la vieja escuela, mantiene el centro del ring y castiga con combinaciones limpias.'
  }
];

export function getFighterDetails(id: CharacterId): FighterDetails {
  return fighters.find((fighter) => fighter.id === id) ?? fighters[0];
}

export interface SelectionCallbacks {
  onStartSelection?: (character: CharacterId) => void;
  onConfirmSelection?: (character: CharacterId) => void;
  onIdle?: (character: CharacterId) => void;
}

export function initSelectionControls(
  store: Box9Store = box9Store,
  callbacks: SelectionCallbacks = {}
) {
  let currentIndex = fighters.findIndex((fighter) => fighter.id === store.getState().character);
  if (currentIndex === -1) currentIndex = 0;

  let gamepadIndex: number | null = null;
  let gamepadLoop: number | null = null;
  let lastGamepadMove = 0;
  let lastGamepadConfirm = 0;

  const clampIndex = (index: number) => {
    const mod = ((index % fighters.length) + fighters.length) % fighters.length;
    return mod;
  };

  const applySelection = (id: CharacterId, animation: 'idle' | 'pose' = 'idle') => {
    const state = store.getState();
    const preferredRing = getDefaultRingForCharacter(id);
    const ringOverride = state.ringOverride;
    const resolvedRing = ringOverride ?? preferredRing;
    const progress = normalizeProgress(state.progress);

    if (!canFightCharacter(id, progress)) {
      window.dispatchEvent(
        new CustomEvent('box9:character-locked', {
          detail: { character: id, reason: getFightLockReason(id, progress) }
        })
      );
      return false;
    }

    if (state.ring !== resolvedRing) {
      store.setState({ ring: resolvedRing, ringOverride });
      window.dispatchEvent(new CustomEvent('box9:ring-change', { detail: { ring: resolvedRing } }));
    }

    currentIndex = fighters.findIndex((fighter) => fighter.id === id);
    store.setState({ character: id });
    if (animation === 'pose') {
      confirmCharacterSelection(id);
      callbacks.onConfirmSelection?.(id);
    } else {
      playIdleAnimation(id);
      callbacks.onIdle?.(id);
    }

    return true;
  };

  const cycle = (direction: number) => {
    const targetIndex = clampIndex(currentIndex + direction);
    const next = fighters[targetIndex].id;
    const success = applySelection(next, 'idle');
    if (success) {
      currentIndex = targetIndex;
    }
  };

  const confirm = () => {
    const fighter = fighters[currentIndex];
    const success = applySelection(fighter.id, 'pose');
    if (success) {
      store.setState({ selectionStarted: false });
    }
  };

  const handleKeydown = (event: KeyboardEvent) => {
    const state = store.getState();

    if (!state.selectionStarted && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      beginSelection();
      return;
    }

    if (!state.selectionStarted) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      cycle(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      cycle(1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      confirm();
    }
  };

  const pollGamepad = () => {
    const pads = navigator.getGamepads?.();
    const pad = gamepadIndex !== null ? pads?.[gamepadIndex] : pads?.find((gp) => gp);
    if (pad) {
      gamepadIndex = pad.index;
      const now = performance.now();
      const left = pad.axes[0] < -0.4 || pad.buttons[14]?.pressed;
      const right = pad.axes[0] > 0.4 || pad.buttons[15]?.pressed;
      const confirmPressed = pad.buttons[0]?.pressed || pad.buttons[9]?.pressed;

      if (!store.getState().selectionStarted && confirmPressed) {
        beginSelection();
        lastGamepadConfirm = now;
        return;
      }

      if (left && now - lastGamepadMove > 220) {
        cycle(-1);
        lastGamepadMove = now;
      } else if (right && now - lastGamepadMove > 220) {
        cycle(1);
        lastGamepadMove = now;
      }

      if (confirmPressed && now - lastGamepadConfirm > 300) {
        confirm();
        lastGamepadConfirm = now;
      }
    }

    if (store.getState().selectionStarted) {
      gamepadLoop = requestAnimationFrame(pollGamepad);
    }
  };

  const beginSelection = () => {
    const character = fighters[currentIndex].id;
    store.setState({ selectionStarted: true, character });
    activateSelection(character);
    callbacks.onStartSelection?.(character);
    applySelection(character, 'idle');
    if (gamepadLoop === null) {
      gamepadLoop = requestAnimationFrame(pollGamepad);
    }
  };

  const handleStartSelection = () => {
    beginSelection();
  };

  const handleChipSelection = (event: Event) => {
    const detail = (event as CustomEvent<{ character: CharacterId }>).detail;
    if (!detail) return;
    const success = applySelection(detail.character, 'idle');
    if (success) {
      currentIndex = fighters.findIndex((fighter) => fighter.id === detail.character);
    }
  };

  const handleStoreChange = () => {
    const state = store.getState();
    const idx = fighters.findIndex((fighter) => fighter.id === state.character);
    if (idx !== -1) {
      currentIndex = idx;
    }

    if (!state.selectionStarted && gamepadLoop !== null) {
      cancelAnimationFrame(gamepadLoop);
      gamepadLoop = null;
    }
  };

  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('box9:start-selection', handleStartSelection as EventListener);
  window.addEventListener('box9:character-selected', handleChipSelection as EventListener);

  const unsubscribe = store.subscribe(handleStoreChange);

  return () => {
    window.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('box9:start-selection', handleStartSelection as EventListener);
    window.removeEventListener('box9:character-selected', handleChipSelection as EventListener);

    if (gamepadLoop !== null) {
      cancelAnimationFrame(gamepadLoop);
    }
    unsubscribe();
  };
}
