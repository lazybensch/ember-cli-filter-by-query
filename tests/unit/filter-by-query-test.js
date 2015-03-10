import filterByQuery from 'ember-cli-filter-by-query/util/filter';
import { test } from 'ember-qunit';
import { module } from 'qunit';

var array;

module('utility function test');

test('filters with "or" conjunction', function(assert) {
  var input, output;
  assert.expect(1);

  input = [
    {id: 1, foo: 'psopao', bar: 'opoko' },
    {id: 2, foo: 'aapoko', bar: 'aaa'},
    {id: 3, foo: 'prsss', bar: 'aa'},
  ];

  output = filterByQuery(input, ['foo','bar'], 'po aa', {conjunction: 'or'});
  assert.deepEqual(output, [input[1], input[2], input[0]]);

});

test('filters with "and" conjunction', function(assert) {
  var input, output;
  assert.expect(1);

  input = [
    {id: 1, foo: 'psopao', bar: 'opoko' },
    {id: 2, foo: 'aapoko', bar: 'aaa'},
    {id: 3, foo: 'prsss', bar: 'aa'},
  ];

  output = filterByQuery(input, ['foo','bar'], 'po aa', {conjunction: 'and'});
  assert.deepEqual(output, [input[1]]);

});
