import { create } from 'zustand';
import {
  createEvalSlice,
  type EvalSlice,
} from '@frontend/data/slices/EvalSlice';
import {
  createSharedSlice,
  type SharedSlice,
} from '@frontend/data/slices/SharedSlice';

export const EvalsStore = create<EvalSlice & SharedSlice>()((...params) => ({
  ...createEvalSlice(...params),
  ...createSharedSlice(...params),
}));
