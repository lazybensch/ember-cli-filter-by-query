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
    {id: 1, property: 'psopo'},
    {id: 2, property: 'aapro'},
    {id: 3, property: 'prsss'},
  ];

  output = filterByQuery(input, 'property', 'pr');
  assert.deepEqual(output, [input[2], input[1]]);


});
