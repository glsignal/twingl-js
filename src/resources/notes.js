(function() {
  "use strict";

  window.Twingl = window.Twingl || {};

  Twingl.Notes = function (client, parentResource) {
    var opts = { resourceEndpoint: "/notes" };

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
