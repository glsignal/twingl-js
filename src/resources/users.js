(function() {
  "use strict";

  window.Twingl = window.Twingl || {};

  Twingl.Users = function (client) {
    var opts = {
      resourceEndpoint: "/users"
    };
    var that = new Twingl.Resource(client, opts);

    /**
     * GET /users/me
     */
    that.me = function (cb) {
      this.read("me", function(res) { cb(res); });
    };

    return that;
  };

})();
