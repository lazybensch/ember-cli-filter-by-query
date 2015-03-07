import Ember from 'ember';
import filterByQuery from 'ember-cli-filter-by-query';
import { test } from 'ember-qunit';
import { module } from 'qunit';

var array;

module('sync-for-each');

test('it returns an array', function(assert) {
  var input, output;
  assert.expect(1);

  input = [
    {id: 1, foo: 'psopao', bar: 'opoko' },
    {id: 2, foo: 'aapoko', bar: 'aaa'},
    {id: 3, foo: 'prsss', bar: 'aa'},
  ];

  output = filterByQuery(input, ['foo','bar'], 'po');
  assert.deepEqual(output, [input[0], input[1]]);


});
