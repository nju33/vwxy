const PATHS = 'paths';

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
    get(target, prop) {
      const paths = Reflect.get(target, PATHS);
      paths.push(prop);
      Reflect.set(target, PATHS, paths);

      return new Proxy(target, this);
    },
    apply(target, _thisArg, argumentsList) {
      const arg1 = argumentsList[0];
      const paths = Reflect.get(target, PATHS) as (string | number)[];

      return paths.reduce((result: any, path) => result[path], arg1);
    },
  }) as any;
};
