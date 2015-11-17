import Ember from 'ember';
/*global Sifter*/

var filterByQuery = function(array, propertyKeys, query, options) {

  if (!query) {
    return Ember.A(array);
  }

  options = Ember.typeOf(options) === 'undefined' ? {} : options;
  propertyKeys = Ember.makeArray(propertyKeys);
  var input, sifter, result, sort;
  sort = 'sort' in options ? options.sort : true;
  delete options['sort'];
  
  input = array.map(function(item) {
    var hash = {};
    propertyKeys.forEach(function(key) {
      hash[key] = Ember.get(item, key);
    });
    return hash;
  });

  options.fields = options.fields || propertyKeys;
  options.limit = options.limit || array.length;
  if (sort) {
    options.sort = propertyKeys.map(function(key) {
      return {field: key, direction: 'asc'};
    });
  }

  sifter = new Sifter(input);
  if (!sort) {
    sifter.getSortFunction = function() {
      return null;
    };
  }
  result = sifter.search(query, options);

  return Ember.A(result.items.map( function(item) {
    return Ember.A(array).objectAt(item.id);
  }));

};

export default filterByQuery;
