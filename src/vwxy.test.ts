import {vwxy, VwxyValue} from './vwxy';

test('basis', () => {
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

test('with index', () => {
  const value = vwxy<{
    arr: {
      value: VwxyValue<string>;
    }[];
  }>().arr[1].value('bar');

  expect(value({arr: [{value: 'foo'}, {value: 'baz'}]})).toBe('baz');
  expect(value({arr: [{value: 'foo'}]})).toBe('bar');
});
