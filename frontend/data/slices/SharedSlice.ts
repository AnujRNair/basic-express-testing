import { immer } from 'zustand/middleware/immer';
import type { StateCreator } from 'zustand';
import type { SliceInterface } from '@frontend/data/slices/SliceInterface';

export interface SharedSlice extends SliceInterface {
  // see SliceInterface for why this one top level key is necessary
  shared: {
    randomNumber: number;
    generateRandomNumber: () => void;
  };
}

export const createSharedSlice: StateCreator<
  SharedSlice,
  [],
  [['zustand/immer', never]]
> = immer((set) => ({
  shared: {
    randomNumber: Math.ceil(Math.random() * 100),
    generateRandomNumber: () => {
      set((state) => {
        state.shared.randomNumber = Math.ceil(Math.random() * 100);
      });
    },
  },
}));
