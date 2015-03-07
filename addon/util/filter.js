import Ember from 'ember';
/*global Sifter*/

var filterByQuery = function(array, propertyKeys, query) {
  propertyKeys = Ember.makeArray(propertyKeys);
  var input, sifter, result;

  input = array.map(function(item) {
    var hash = {};
    propertyKeys.forEach(function(key) {
      hash[key] = Ember.get(item, key);
    });
    return hash;
  });

  sifter = new Sifter(input);

  result = sifter.search(query, {
    fields: propertyKeys,
    sort: propertyKeys.map(function(key) {return {field: key, direction: 'asc'};}),
    limit: array.length
  });

  return result.items.map( function(item) {
    return array[item.id];
  });

};

export default filterByQuery;
