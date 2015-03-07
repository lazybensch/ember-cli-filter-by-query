# Ember-cli-filter-by-query

This addon provides you with a computed macro to filter an array of objects based on a given search query. Other related addons often export components that might not suit your needs, `ember-cli-filter-by-query` only exports a computed macro and the filtering function itself so you can do whatever you want with it. Since the filtered list will always be sorted based on similarity to the search query a popular usecase could be autocompletion.

Under the hood it uses sifter.js, which is *most likely* faster then any filter solution you or I could come up with ;)

## Example

```javascript
import computedFilterByQuery from 'ember-cli-filter-by-query';

Guy = DS.Model.extend({

  filteredList: computedFilterByQuery( 'friends', 'name', 'query')

});
```
`filteredList` will include all friends, whos names match the value of the `query` property - sorted by similarity to the search term. You can also pass an array of property keys as the second argument and both will be matched - ordered with preceding priority.

```javascript
import computedFilterByQuery from 'ember-cli-filter-by-query';

Guy = DS.Model.extend({

  filteredList: computedFilterByQuery( 'friends', ['name', 'surname'], 'query')

});
```

`filteredList` will recompute, whenever the value of `guy.get('query')` or `guy.get('friends.@each.{name,surname}')` changes. If you are in need of the underlying filder method and don't need to wrap that in a computed macro, you can access it too:

```javascript
import filterByQuery from 'ember-cli-filter-by-query/util/filter';

filterByQuery( guy.get('friends'), ['name','surname'], controller.get('query'));
```

Notice that in this case, the first and last argument can't be property keys anymore but have to be the actuall array and query.

## Installation

To use this addon in your project, just type:
```
$ ember install:addon ember-cli-filter-by-query
```
or for older versions of ember-cli *(pre 1.4.0)*:
```
$ npm install --save-dev ember-cli-filter-by-query
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

I am happy about any contributions or PRs. If you are missing some piece of functionality please open an issue. This addon is quite simple and can be extended easily.

* `git clone https://github.com/lazybensch/ember-cli-filter-by-query`
* `cd ember-cli-filter-by-query`
* `npm install`
* `bower install`
* `ember test`

