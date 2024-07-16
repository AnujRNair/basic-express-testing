import { type StoreApi, type UseBoundStore } from 'zustand';
import { shallow } from 'zustand/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { EvalsStore } from '@frontend/data/EvalsStore';
import type { EvalSlice } from '@frontend/data/slices/EvalSlice';
import type { SharedSlice } from '@frontend/data/slices/SharedSlice';
import type { TaskSlice } from '@frontend/data/slices/TaskSlice';
import { TasksStore } from '@frontend/data/TasksStore';

/**
 * All possible slices are registered here, so they can be properly recognized when using useSlice<Slice>()
 */
type PossibleSlices = TaskSlice | EvalSlice | SharedSlice;

/**
 * Gets the store based on the current route. Each lazily loaded route should have its own store.
 */
function getStore<T>(): StoreApi<T> {
  const firstPart = window.location.pathname.split('/')[1];

  switch (firstPart) {
    case 'tasks': {
      return TasksStore as UseBoundStore<StoreApi<T>>;
    }
    case 'evals': {
      return EvalsStore as UseBoundStore<StoreApi<T>>;
    }
    default:
      throw new Error('Store not found for this route.');
  }
}

/**
 * A helper function to get data from a slice of the store.
 * This automatically selects the correct store based on the current route, and then runs the selector against it.
 * Function has to be curried because we want developer to note which slices they want to use, but return value of selector should be inferred.
 * Similar to how useStore works: https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md#basic-usage
 *
 * If desired, useSlice also allows us to grab data from multiple slices at the same time:
 * const { fromSlice1, fromSlice2 } = useSlice<Slice1 & Slice2>()((state) => ({ fromSlice1: state.slice1.data, fromSlice2: state.slice2.data }));
 */
export function useSlice<T extends PossibleSlices>() {
  return function useCurriedData<U>(
    selector: (state: T) => U,
    equalityFn?: ((a: U, b: U) => boolean) | undefined,
  ): U {
    const store = getStore<T>();
    return useStoreWithEqualityFn(
      store,
      selector,
      equalityFn === undefined ? shallow : equalityFn,
    );
  };
}
