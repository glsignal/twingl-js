(function() {
  "use strict";

  window.Twingl = window.Twingl || {};

  Twingl.Client = function (opts) {
    this.token    = opts.token;
    this.baseUrl  = opts.baseUrl || Twingl.defaults.baseUrl;
    this.version  = opts.version || Twingl.defaults.version;
  };

  /**
   * Delegated to Twingl.Users resource
   */
  Twingl.Client.prototype.me = function (cb) {
    (new Twingl.Users(this)).me(cb);
  };

})();
