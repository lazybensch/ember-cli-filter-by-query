/* jshint node: true */
'use strict';

var path = require('path');
var stew = require('broccoli-stew');

module.exports = {
  name: 'ember-cli-filter-by-query',

  init: function() {
    this._super.init && this._super.init.apply(this, arguments);

    var bowerDeps = this.project.bowerDependencies();
    if (bowerDeps['sifter']) {this.ui.writeWarnLine('Please remove `sifter` from `bower.json`. As of ember-cli-filter-by-query 1.3.0, only the NPM package is needed.');}
  },

  treeForVendor: function() {
    var sifter = stew.find(path.dirname(require.resolve('sifter')), {
      destDir: 'sifter',
      files: ['sifter.js']
    });

    return stew.find([
      sifter
    ]);
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/sifter/sifter.js', {
      using: [
        { transformation: 'amd', as: 'sifter' }
      ]
    });
  }
};
