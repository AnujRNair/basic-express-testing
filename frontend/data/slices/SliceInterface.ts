type NotUnion<T, U = T> = T extends any ? ([U] extends [T] ? T : never) : never;

type SingleProperty<T extends {}> =
  keyof T extends NotUnion<keyof T> ? T : never;

/**
 * Slices have to be keyed by a top level property to ensure that props aren't overridden.
 * This enforces slices to have a single top level property, with all other properties nested within.
 */
export type SliceInterface = SingleProperty<
  Record<
    string,
    {
      [key: string]: any;
    }
  >
>;
