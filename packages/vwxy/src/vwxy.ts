const PATHS = 'paths';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface VwxyDictionary {
  [k: string]: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface VwxyObject<T> {
  [x: string]: T | T[] | VwxyObject<T> | VwxyObject<T>[];
}

export type VwxyValue<T, O extends VwxyObject<T> = VwxyObject<T>> = (
  defaultValue?: T,
) => (val: O) => T;

export interface VwxyCreateFn {
  (): void;
  paths: (string | number)[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VwxyReturnFn = (object: {[x: string]: string | number}) => any;

const createFn = (): VwxyCreateFn => {
  const fn: {(): void; paths: (string | number)[]} = function(): void {};
  fn.paths = [] as (string | number)[];

  return fn;
};

export const vwxy = <T extends VwxyDictionary = VwxyDictionary>(): T => {
  return new Proxy<ReturnType<typeof createFn>>(createFn(), {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(target, prop, receiver): any {
      const paths = target[PATHS];
      if (typeof prop === 'symbol') {
        throw new Error('Does not support Symbol');
      }

      paths.push(prop);

      return receiver;
    },
    apply(target, _thisArg, argumentsList): VwxyReturnFn {
      const defaultValue = argumentsList[0];
      const paths = target[PATHS];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (object: {
        [x: string]: string | number;
      }): ReturnType<VwxyReturnFn> => {
        try {
          return paths.reduce((result: {[x: string]: string | number}, path):
            | ReturnType<VwxyReturnFn>
            | {[x: string]: string | number} => {
            if (!Object.prototype.hasOwnProperty.call(result, path)) {
              throw new Error(`Do not have ${path}`);
            }

            return result[path];
          }, object);
        } catch {
          return defaultValue;
        }
      };
    },
  }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
};
