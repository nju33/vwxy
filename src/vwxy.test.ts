import {vwxy} from './vwxy';

test('basis', () => {
  const value = vwxy<{
    foo: {bar: {baz(val: {foo: {bar: {baz: number}}}): number}};
  }>().foo.bar.baz({
    foo: {bar: {baz: 33}},
  });

  expect(value).toBe(33);
});

test('with index', () => {
  const value = vwxy<{
    arr: {value(value: {arr: {value: string}[]}): string}[];
  }>().arr[1].value({arr: [{value: 'foo'}, {value: 'baz'}]});

  expect(value).toBe('baz');
});
