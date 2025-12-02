export type RingId = 'mmaGym' | 'bodybuilderArena' | 'tysonRing';
export type CharacterId = 'mma' | 'bodybuilder' | 'tyson' | 'principal';

export type GloveLevel = 'entrenamiento' | 'amateur' | 'pro' | 'secreto';

export type WinLedger = Record<GloveLevel, Record<CharacterId, number>>;

export interface ProgressionState {
  wins: WinLedger;
  activeGlove: GloveLevel;
  unlocks: {
    amateur: boolean;
    tyson: boolean;
    pro: boolean;
    secreto: boolean;
  };
}

export const CHARACTER_DEFAULT_RING: Record<CharacterId, RingId> = {
  mma: 'mmaGym',
  bodybuilder: 'bodybuilderArena',
  tyson: 'tysonRing',
  principal: 'tysonRing'
};

export function getDefaultRingForCharacter(character: CharacterId): RingId {
  return CHARACTER_DEFAULT_RING[character];
}

export interface Box9State {
  ring: RingId;
  freeCamera: boolean;
  character: CharacterId;
  selectionStarted: boolean;
  progress: ProgressionState;
}

export type Box9StateListener = (state: Box9State) => void;

export interface Box9Store {
  getState(): Box9State;
  subscribe(listener: Box9StateListener): () => void;
  setState(update: Partial<Box9State>): void;
}

const defaultState: Box9State = {
  ring: CHARACTER_DEFAULT_RING.mma,
  freeCamera: false,
  character: 'mma',
  selectionStarted: false,
  progress: {
    wins: {
      entrenamiento: { mma: 0, bodybuilder: 0, tyson: 0, principal: 0 },
      amateur: { mma: 0, bodybuilder: 0, tyson: 0, principal: 0 },
      pro: { mma: 0, bodybuilder: 0, tyson: 0, principal: 0 },
      secreto: { mma: 0, bodybuilder: 0, tyson: 0, principal: 0 }
    },
    activeGlove: 'entrenamiento',
    unlocks: { amateur: false, tyson: false, pro: false, secreto: false }
  }
};

export function createBox9Store(initialState: Box9State = defaultState): Box9Store {
  let state = { ...initialState };
  const listeners = new Set<Box9StateListener>();

  const notify = () => {
    listeners.forEach((listener) => listener(state));
  };

  return {
    getState: () => state,
    subscribe: (listener: Box9StateListener) => {
      listeners.add(listener);
      listener(state);
      return () => listeners.delete(listener);
    },
    setState: (update: Partial<Box9State>) => {
      const nextState = { ...state, ...update };
      const changed = Object.keys(update).some((key) => (state as any)[key] !== (nextState as any)[key]);
      state = nextState;
      if (changed) {
        notify();
      }
    }
  };
}

export const box9Store = createBox9Store();
