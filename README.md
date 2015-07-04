# Ember-cli-filter-by-query
[![Build Status](https://travis-ci.org/lazybensch/ember-cli-filter-by-query.svg)](https://travis-ci.org/lazybensch/ember-cli-filter-by-query) [![Code Climate](https://codeclimate.com/github/lazybensch/ember-cli-filter-by-query/badges/gpa.svg)](https://codeclimate.com/github/lazybensch/ember-cli-filter-by-query)

This addon provides you with a computed property macro to filter an array of objects based on a given search query. Other related addons often export components that might not suit your needs, `ember-cli-filter-by-query` only exports the macro and the filtering function itself so you can do whatever you want with it. Since the filtered list will always be sorted based on similarity to the search query a popular usecase could be autocompletion.

Under the hood it uses [sifter.js](https://github.com/brianreavis/sifter.js/), which is *most likely* faster then any filter solution you or I could come up with ;)

## Example

```javascript
import computedFilterByQuery from 'ember-cli-filter-by-query';

Guy = DS.Model.extend({

  filteredList: computedFilterByQuery('friends', 'name', 'query')

});
```
`filteredList` will include all friends, whos names match the value of the `query` property - sorted by similarity to the search term. You can also pass an array of property keys as the second argument and both will be matched - ordered with preceding priority.

```javascript
import computedFilterByQuery from 'ember-cli-filter-by-query';

Guy = DS.Model.extend({

  filteredList: computedFilterByQuery( 'friends', ['name', 'surname'], 'query')

});
```

`filteredList` will recompute, whenever the value of `guy.get('query')` or `guy.get('friends.@each.{name,surname}')` changes. If you are in need of the underlying filter method and don't want to wrap that in a computed property macro, you can access it too:

```javascript
import filterByQuery from 'ember-cli-filter-by-query/util/filter';

filterByQuery( guy.get('friends'), ['name','surname'], controller.get('query'));
```

Notice that in this case, the first and last argument can't be property keys anymore but have to be the actual array and query.

## additional Options

It is possible to pass a set of different options to the computed property macro aswell as to the utility function.

| Option        | Type | Description  |
| ------------- |:-----|:------|
| filter        | boolean | If `false`, items with a score of zero will not be filtered out of the result-set. |
| conjunction   | string  | Determines how multiple search terms are joined ("and" or "or"). |
| sort          | boolean  | Default is `true`. If `true`, the output is sorted by score. If `false`, the output is in the same order as the input. |

```javascript
import computedFilterByQuery from 'ember-cli-filter-by-query';

Guy = DS.Model.extend({

  smallList: computedFilterByQuery( 'friends', ['name', 'surname'], 'query', {conjunction: 'and' })
  // this will only list friends whos name or surname include every word in the query

  largeList: computedFilterByQuery( 'friends', ['name', 'surname'], 'query', {conjunction: 'or' })
  // this will list friends whos name or surname include at least one word of the query

});
```

## Installation

To use this addon in your project, just type:
```
$ ember install ember-cli-filter-by-query
```
or for older versions of ember-cli *(pre 1.4.0)*:
```
$ npm install --save-dev ember-cli-filter-by-query
$ ember generate ember-cli-filter-by-query
```
and then import the function wherever you need it:
```
import computedFilterByQuery from 'ember-cli-filter-by-query';
```
or
```
import filterByQuery from 'ember-cli-filter-by-query/util/filter';
```

## Contributing

I am happy about any contributions or PRs. If you are missing some piece of functionality please open an issue. This addon is quite simple and can be extended easily. It is using sifter.js internally which has a richer API than what i am exposing here.

* `git clone https://github.com/lazybensch/ember-cli-filter-by-query`
* `cd ember-cli-filter-by-query`
* `npm install`
* `bower install`
* `ember test`

