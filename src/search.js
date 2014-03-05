(function () {
  "use strict";

  window.Twingl = window.Twingl || {};

  /**
   * The Resource class is here as a wrapper for any transactions made with the
   * Twingl API. It provides a simple wrapper around resource requests (e.g.
   * GET highlights/:id) and will insert the appropriate headers, parse the
   * response appropriately.
   */
  Twingl.Search = function (client) {
    this.client = client;
  };

  Twingl.Search.prototype.request = Twingl.Resource.prototype.request;

  Twingl.Search.prototype._search = function(term, resource, params, cb) {
    params = params || {};
    params.q = term;

    var queryParams = Twingl.Util.toUrlParam(params);
    var url = this.client.baseUrl + "/" + this.client.version;

    if (resource) url += "/" + resource;
    url += "/search" + queryParams;

    this.request(url, "get", cb);
  };

  Twingl.Search.prototype.all = function(term, cb, params) {
    this._search(term, null, params, cb);
  };

  Twingl.Search.prototype.notes = function(term, cb, params) {
    this._search(term, "notes", params, cb);
  };

  Twingl.Search.prototype.highlights = function(term, cb, params) {
    this._search(term, "highlights", params, cb);
  };


})();
