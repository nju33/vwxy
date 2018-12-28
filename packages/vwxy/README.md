# vwxy

A to get function.

[![github](https://badgen.net/badge//nju33,vwxy/000?icon=github&list=1)](https://github.com/nju33/vwxy)
[![npm:version](https://badgen.net/npm/v/vwxy?icon=npm&label=)](https://www.npmjs.com/package/vwxy)
[![typescript](https://badgen.net/badge/lang/typescript/0376c6?icon=npm)](https://www.typescriptlang.org/)
[![ci:status](https://badgen.net/circleci/github/nju33/vwxy)](https://circleci.com/gh/nju33/vwxy)
[![document:typedoc](https://badgen.net/badge/document/typedoc/9602ff)](https://docs--vwxy.netlify.com/)
[![license](https://badgen.net/npm/license/vwxy)](https://github.com/nju33/vwxy/blob/master/LICENSE)
[![browserslist](https://badgen.net/badge/browserslist/chrome,edge/ffd539?list=1)](https://browserl.ist/?q=last+1+chrome+version%2C+last+1+edge+version)
[![code style: prettier](https://badgen.net/badge//prettier/ff69b3?label=code%20style)](https://github.com/prettier/prettier)

## Usage

````js
/**
 * To prepare of using the `vwxy`
 * ```sh
 * yarn add vwxy
 * ```
 */
import vwxy, {VwxyValue} from 'vwxy';
````

or

```html
<script src="https://unpkg.com/vwxy/vwxy.js"></script>
<script>
  // Can use the `vwxy` here.
</script>
```

## Example

```ts
const baz = vwxy<{
  foo: {
    bar: {
      baz: VwxyValue<number>;
    };
  };
}>().foo.bar.baz(123);

expect(
  baz({
    foo: {bar: {baz: 33}},
  }),
).toBe(33);
expect(baz({foo: {xxx: 33}})).toBe(123);
```

```ts
const value = vwxy<{
  arr: {
    value: VwxyValue<string>;
  }[];
}>().arr[1].value('bar');

expect(value({arr: [{value: 'foo'}, {value: 'baz'}]})).toBe('baz');
expect(value({arr: [{value: 'foo'}]})).toBe('bar');
```

[![Edit example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vyzyjyl283?initialpath=src%2Findex.ts&module=%2Fsrc%2Findex.ts)