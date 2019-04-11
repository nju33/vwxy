import {vwxy, VwxyValue} from './vwxy';

test('basis', (): void => {
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
});

test('with index', (): void => {
  const value = vwxy<{
    arr: {
      value: VwxyValue<string>;
    }[];
  }>().arr[1].value('bar');

  expect(value({arr: [{value: 'foo'}, {value: 'baz'}]})).toBe('baz');
  expect(value({arr: [{value: 'foo'}]})).toBe('bar');
});

test('1 layer', (): void => {
  const foo = vwxy().foo('foo');
  const bar = vwxy().bar('bar');

  expect(foo({})).toBe('foo');
  expect(bar({bar: 'xxx'})).toBe('xxx');
});
