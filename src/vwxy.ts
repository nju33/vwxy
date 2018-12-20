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
    get(target, prop, receiver) {
      const paths = target[PATHS];
      paths.push(prop as any);

      return receiver;
    },
    apply(target, _thisArg, argumentsList) {
      const arg1 = argumentsList[0];
      const paths = target[PATHS];

      return paths.reduce((result: any, path) => result[path], arg1);
    },
  }) as any;
};
