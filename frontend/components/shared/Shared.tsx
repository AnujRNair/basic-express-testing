import React, { memo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import type { SharedSlice } from '@frontend/data/slices/SharedSlice';
import { useSlice } from '@frontend/data/Store';

function InnerShared() {
  /** can also destructure and useShallow to ensure re-renders are minimized */
  const [generateRandomNumber, randomNumber] = useSlice<SharedSlice>()(
    useShallow((state) => [
      state.shared.generateRandomNumber,
      state.shared.randomNumber,
    ]),
  );
  return (
    <>
      <div>Shared</div>
      <div>Random Number: {randomNumber}</div>
      <button onClick={generateRandomNumber}>Generate Random Number</button>
    </>
  );
}

export const Shared = memo(InnerShared);
