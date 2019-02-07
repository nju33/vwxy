const PATHS = 'paths';

export interface VwxyObject<T> {
  [x: string]: T | T[] | VwxyObject<T> | VwxyObject<T>[];
}

export type VwxyValue<T, O extends VwxyObject<T> = VwxyObject<T>> = (
  defaultValue?: T,
) => (val: O) => T;

const createFn = () => {
  // tslint:disable-next-line:only-arrow-functions no-empty
  const fn: {(): void; paths: (string | number)[]} = function() {};
  fn.paths = [] as (string | number)[];

  return fn;
};

export const vwxy = <
  T extends {[k: string]: any} = {[k: string]: any}
>(): T => {
  return new Proxy<ReturnType<typeof createFn>>(createFn(), {
    get(target, prop, receiver) {
      const paths = target[PATHS];
      paths.push(prop as any);

      return receiver;
    },
    apply(target, _thisArg, argumentsList) {
      const defaultValue = argumentsList[0];
      const paths = target[PATHS];

      return (object: any) => {
        try {
          return paths.reduce((result: any, path) => {
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
  }) as any;
};
