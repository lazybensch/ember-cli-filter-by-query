import computedFilterByQuery from 'ember-cli-filter-by-query';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

var obj, germany, algeria, nigeria;
var france, russia, mexico, somalia, brittain;

module('computed property test', function (hooks) {
  // setupTest(hooks);  
  
  hooks.beforeEach(function () {
    class Type extends EmberObject {
      @computedFilterByQuery('list', 'country', 'query') foo;
      @computedFilterByQuery('list', 'continent', 'query') bar;
      @computedFilterByQuery('list', ['continent', 'country'], 'query') baz;
    }

    germany = EmberObject.create({
      country: 'Germany',
      capital: 'Berlin',
      continent: 'Europe',
    });

    algeria = EmberObject.create({
      country: 'Algeria',
      capital: 'Algiers',
      continent: 'Africa',
    });

    nigeria = EmberObject.create({
      country: 'Nigeria',
      capital: 'Abuja',
      continent: 'Africa',
    });

    france = EmberObject.create({
      country: 'France',
      capital: 'Paris',
      continent: 'Europe',
    });

    russia = EmberObject.create({
      country: 'Russia',
      capital: 'Moscow',
      continent: 'Europe/Asia',
    });

    mexico = EmberObject.create({
      country: 'Mexico',
      capital: 'Mexico City',
      continent: 'North America',
    });

    somalia = EmberObject.create({
      country: 'Somalia',
      capital: 'Mogadishu',
      continent: 'Africa',
    });

    brittain = EmberObject.create({
      country: 'Great Brittain',
      capital: 'London',
      continent: 'Europe',
    });

    obj = Type.create({
      list: [
        brittain,
        germany,
        algeria,
        nigeria,
        somalia,
        mexico,
        russia,
        france,
      ],
    });
  });

  test('it filters a list', function (assert) {
    assert.expect(3);

    obj.set('query', 'ger');
    assert.deepEqual(
      obj.get('foo'),
      [germany, algeria, nigeria],
      'it only includes matches'
    );

    obj.set('query', 'europe');
    assert.deepEqual(obj.get('bar.length'), 4, 'filters case insensitive');

    obj.set('query', 'ri');
    assert.deepEqual(obj.get('baz.length'), 5, 'respects property key order');
  });
});
