'use strict';

module.exports = {
  normalizeEntityName: function() {},
  afterInstall: function() {
    return this.addBowerPackageToProject('sifter', '~0.4.3');
  }
};
