import React from 'react';
import { Shared } from '@frontend/components/shared/Shared';
import type { EvalSlice } from '@frontend/data/slices/EvalSlice';
import { useSlice } from '@frontend/data/Store';

/**
 * Components should care about *slices* of the store, not the store itself.
 * By using a new helper, useSlice, we can automatically determine the store we should use and get the data from the slice in that store
 *
 * As shown below, useSlice allows us to get a single property, or destructure multiple properties.
 *
 * The noop button attempts to create a new object and set it in store.
 * When turning on "highlight re-renders" in react dev tools, clicking the button shows nothing highlighted, showing the useSlice helper is working as expected.
 */
export default function Evals() {
  const something = useSlice<EvalSlice>()((state) => state.eval.something);
  const { addToSomething, noop } = useSlice<EvalSlice>()(
    (state) => state.eval.actions,
  );

  return (
    <>
      <div>Evals</div>
      <ul>
        {Object.entries(something).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
      <button onClick={addToSomething}>Add `something` entry</button>
      <button onClick={noop}>noop to try and force render</button>
      <hr />
      <Shared />
    </>
  );
}
