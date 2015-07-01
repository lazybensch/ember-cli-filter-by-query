import Ember from 'ember';
import filterByQuery from 'ember-cli-filter-by-query/util/filter';

var computedFilterByQuery = function(dependentKey, propertyKeys, queryKey, options) {
  propertyKeys = Ember.makeArray(propertyKeys);

  return Ember.computed( queryKey, '' + dependentKey + '.@each.{' + propertyKeys.join(',') + '}', function() {

    var array = this.get(dependentKey);
    var query = this.get(queryKey) || '';

    return filterByQuery(array, propertyKeys, query, options);

  });
};

export default computedFilterByQuery;
