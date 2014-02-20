(function() {
  "use strict";

  window.Twingl = window.Twingl || {};

  Twingl.Highlights = function (client) {
    var opts = {
      resourceEndpoint: "/highlights"
    };
    var that = new Twingl.Resource(client, opts);

    return that;
  };

})();
