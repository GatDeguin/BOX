export type RingId = 'classic' | 'neon' | 'rooftop';
export type CharacterId = 'striker' | 'brawler' | 'counter';

export interface Box9State {
  ring: RingId;
  freeCamera: boolean;
  character: CharacterId;
  selectionStarted: boolean;
}

export type Box9StateListener = (state: Box9State) => void;

export interface Box9Store {
  getState(): Box9State;
  subscribe(listener: Box9StateListener): () => void;
  setState(update: Partial<Box9State>): void;
}

const defaultState: Box9State = {
  ring: 'classic',
  freeCamera: false,
  character: 'striker',
  selectionStarted: false
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
