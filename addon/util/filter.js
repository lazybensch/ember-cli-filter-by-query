import { A, makeArray} from '@ember/array';
import { typeOf } from '@ember/utils';
import { get } from '@ember/object';
import Sifter from 'sifter';

var filterByQuery = function(array, propertyKeys, query, options) {

  if (!query) {
    return A(array);
  }

  options = typeOf(options) === 'undefined' ? {} : options;
  propertyKeys = makeArray(propertyKeys);
  var input, sifter, result, sort;
  sort = 'sort' in options ? options.sort : true;
  delete options['sort'];

  input = array.map(function(item) {
    var hash = {};
    propertyKeys.forEach(function(key) {
      hash[key] = get(item, key);
    });
    return hash;
  });

  options.fields = options.fields || propertyKeys;
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

  return A(result.items.map( function(item) {
    return A(array).objectAt(item.id);
  }));

};

export default filterByQuery;
