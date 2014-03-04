(function() {
  "use strict";

  window.Twingl = window.Twingl || {};

  Twingl.Highlights = function (client, parentResource) {
    var opts = { resourceEndpoint: "/highlights" };

    if (parentResource) {
      opts.parentResource = {
        type: parentResource.type,
        id  : parentResource.id
      };
    }

    var that = new Twingl.Resource(client, opts);

    return that;
  };

})();
