(function() {
  "use strict";

  window.Twingl = window.Twingl || {};
  
  Twingl.Client = function (opts) {
    this.token    = opts.token;
    this.baseUrl  = opts.baseUrl || Twingl.defaults.baseUrl;
  };

})();
