import vwxy, {VwxyValue} from 'vwxy';

((): void => {
  const baz = vwxy<{
    foo: {
      bar: {
        baz: VwxyValue<number>;
      };
    };
  }>().foo.bar.baz(123);

  console.log(
    'vwxy().foo.bar.baz(123) ',
    baz({
      foo: {bar: {baz: 33}},
    }),
  );

  const value = vwxy<{
    arr: {
      value: VwxyValue<string>;
    }[];
  }>().arr[1].value('bar');

  console.log(
    `vwxy().arr[1].value('baz') `,
    value({arr: [{value: 'foo'}, {value: 'baz'}]}),
  );
})();
