import Ember from 'ember';
/*global Sifter*/

var filterByQuery = function(array, propertyKey, query) {
  var input, sifter, result;

  input = array.map(function(item) {
    return { id: Ember.get(item, 'id'), property: Ember.get(item, propertyKey) };
  });

  sifter = new Sifter(input);

  result = sifter.search(query, {
    fields: [propertyKey],
    sort: [{field: propertyKey, direction: 'asc'}],
    limit: array.length
  });

  return result.items.map( function(item) {
    return array[item.id];
  });

};

export default filterByQuery;
