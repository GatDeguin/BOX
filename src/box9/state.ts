export type RingId = 'mmaGym' | 'bodybuilderArena' | 'tysonRing';
export type CharacterId = 'mma' | 'bodybuilder' | 'tyson';

export type GloveLevel = 'entrenamiento' | 'pro' | 'secreto';

export interface ProgressionState {
  wins: Record<CharacterId, number>;
  gloveLevel: GloveLevel;
  secretUnlocked: boolean;
  tysonUnlocked: boolean;
}

export const CHARACTER_DEFAULT_RING: Record<CharacterId, RingId> = {
  mma: 'mmaGym',
  bodybuilder: 'bodybuilderArena',
  tyson: 'tysonRing'
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
      mma: 0,
      bodybuilder: 0,
      tyson: 0
    },
    gloveLevel: 'entrenamiento',
    secretUnlocked: false,
    tysonUnlocked: false
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
