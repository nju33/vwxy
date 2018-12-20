# vwxy

A to get function.

## Usage

````js
/**
 * To prepare of using the `vwxy`
 * ```sh
 * yarn add vwxy
 * ```
 */
import vwxy from 'vwxy';
````

or

```html
<script src="https://unpkg.com/vwxy@0.0.3/vwxy.js"></script>
<script>
  // Can use the `vwxy` here.
</script>
```

## Example

```ts
const value = vwxy().foo.bar.baz({
  foo: {bar: {baz: 33}},
});
console.log(value); // 33

const value = vwxy<{
  arr: {value(value: {arr: {value: string}[]}): string}[];
}>().arr[1].value({arr: [{value: 'foo'}, {value: 'baz'}]});

console.log(value); // baz
```

## Browsers

|Browser|support|
|:---|:---:|
|IE|no|
|Edge|ok|
|Chrome|ok|
|Firefox|ok|
|Safari|ok|