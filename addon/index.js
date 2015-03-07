import Ember from 'ember';
/*global Sifter*/

var filterByQuery = function(array, propertyKeys, query) {
  var input, sifter, result;
  propertyKeys = Ember.makeArray(propertyKeys);

  input = array.map(function(item) {
    var obj = { id: Ember.get(item, 'id')};
    propertyKeys.forEach(function(key) {
      obj[key] = Ember.get(item, key);
    });
    return obj;
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
