# vwxy

## Install

```sh
yarn add vwxy
```

## Example

```ts
import vwxy from 'vwxy';

const value = vwxy().foo.bar.baz({
  foo: {bar: {baz: 33}},
});
console.log(value); // 33

/**
 * @example
 * // with Generics
 * const value = vwxy<{
 *   foo: {bar: {baz(val: {foo: {bar: {baz: number}}}): number}};
 * }>().foo.bar.baz({
 *   foo: {bar: {baz: 33}},
 * });
 */

const value = vwxy<{
  arr: {value(value: {arr: {value: string}[]}): string}[];
}>().arr[1].value({arr: [{value: 'foo'}, {value: 'baz'}]});

console.log(value); // baz
```
