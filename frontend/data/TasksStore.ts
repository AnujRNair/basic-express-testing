import { create } from 'zustand';
import {
  createSharedSlice,
  type SharedSlice,
} from '@frontend/data/slices/SharedSlice';
import {
  createTaskSlice,
  type TaskSlice,
} from '@frontend/data/slices/TaskSlice';

export const TasksStore = create<TaskSlice & SharedSlice>()((...params) => ({
  ...createTaskSlice(...params),
  ...createSharedSlice(...params),
}));
