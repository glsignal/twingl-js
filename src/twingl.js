(function() {
  'use strict';

  window.Twingl = function(opts) {
    this.message = opts.message;
  };

  Twingl.prototype.getMessage = function() {
    return "Hello " + this.message;
  };

})();
