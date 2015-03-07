import Ember from 'ember';
import computedFilterByQuery from 'ember-cli-filter-by-query';
import { test } from 'ember-qunit';
import { module } from 'qunit';

var Type, obj, germany, algeria, nigeria;
var france, russia, mexico, somalia, brittain;
module('computed property test', {
  beforeEach: function() {
    Type = Ember.Object.extend({
      foo: computedFilterByQuery('list', 'country', 'query'),
      bar: computedFilterByQuery('list', 'continent', 'query'),
      baz: computedFilterByQuery('list', ['continent', 'country'], 'query'),
    });

    germany = Ember.Object.create({
      country: 'Germany',
      capital: 'Berlin',
      continent: 'Europe'
    });

    algeria = Ember.Object.create({
      country: 'Algeria',
      capital: 'Algiers',
      continent: 'Africa'
    });

    nigeria = Ember.Object.create({
      country: 'Nigeria',
      capital: 'Abuja',
      continent: 'Africa'
    });

    france = Ember.Object.create({
      country: 'France',
      capital: 'Paris',
      continent: 'Europe'
    });

    russia = Ember.Object.create({
      country: 'Russia',
      capital: 'Moscow',
      continent: 'Europe/Asia'
    });

    mexico = Ember.Object.create({
      country: 'Mexico',
      capital: 'Mexico City',
      continent: 'North America'
    });

    somalia = Ember.Object.create({
      country: 'Somalia',
      capital: 'Mogadishu',
      continent: 'Africa'
    });

    brittain = Ember.Object.create({
      country: 'Great Brittain',
      capital: 'London',
      continent: 'Europe'
    });

    obj = Type.create({
      list: [brittain, germany, algeria, nigeria, somalia, mexico, russia, france]
    });
  }
});


test('it filters a list', function(assert) {
  assert.expect(3);

  obj.set('query', 'ger');
  assert.deepEqual(obj.get('foo'), [germany, algeria, nigeria], 'it only includes matches');

  obj.set('query', 'europe');
  assert.deepEqual(obj.get('bar.length'), 4, 'filters case insensitive');

  obj.set('query', 'ri');
  assert.deepEqual(obj.get('baz.length'), 5, 'respects property key order');

});
