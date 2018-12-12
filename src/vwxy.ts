const PATHS = 'paths';

namespace vwxyOriginalFunction {
  export let paths: (string | number)[];
}

const createFn = () => {
  function vwxyOriginalFunction() {}
  vwxyOriginalFunction.paths = [] as (string | number)[];

  return vwxyOriginalFunction;
};

export const vwxy = <
  T extends {[k: string]: any} = {[k: string]: any}
>(): T => {
  return new Proxy<ReturnType<typeof createFn>>(createFn(), {
    get(target, prop) {
      const paths = Reflect.get(target, PATHS);
      paths.push(prop);
      Reflect.set(target, PATHS, paths);

      return new Proxy(target, this);
    },
    apply(target, thisArg, argumentsList) {
      const arg1 = argumentsList[0];
      const paths = Reflect.get(target, PATHS) as (string | number)[];

      return paths.reduce((result: any, path) => result[path], arg1);
    },
  }) as any;
};
