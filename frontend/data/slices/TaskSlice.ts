import { immer } from 'zustand/middleware/immer';
import type { StateCreator } from 'zustand';
import type { SliceInterface } from '@frontend/data/slices/SliceInterface';

export interface TaskSlice extends SliceInterface {
  // see SliceInterface for why this one top level key is necessary
  task: {
    task: Record<string, string>;
    number: number;
  };
}

export const createTaskSlice: StateCreator<
  TaskSlice,
  [],
  [['zustand/immer', never]]
> = immer(() => ({
  task: {
    task: {},
    number: 1,
  },
}));
