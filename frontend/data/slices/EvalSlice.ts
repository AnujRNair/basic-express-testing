import { immer } from 'zustand/middleware/immer';
import type { StateCreator } from 'zustand';
import type { SliceInterface } from '@frontend/data/slices/SliceInterface';

export interface EvalSlice extends SliceInterface {
  // see SliceInterface for why this one top level key is necessary
  eval: {
    something: Record<string, string>;
    another: number;
    actions: {
      addToSomething: () => void;
      noop: () => void;
    };
  };
}

export const createEvalSlice: StateCreator<
  EvalSlice,
  [],
  [['zustand/immer', never]]
> = immer((set) => ({
  eval: {
    something: {},
    another: 1,
    actions: {
      addToSomething: () => {
        set((state) => {
          // add a key-value pair to the something object just to expand it
          const curr = state.eval.something;
          state.eval.something = {
            ...curr,
            [Object.keys(curr).length]: Object.keys(curr).length,
          };
        });
      },
      noop: () => {
        set((state) => {
          // force a new object to try and force a render
          const curr = state.eval.something;
          state.eval.something = { ...curr };
        });
      },
    },
  },
}));
