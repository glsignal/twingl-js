(function() {
  "use strict";

  window.Twingl = window.Twingl || {};

  /**
   * The Resource class is here as a wrapper for any transactions made with the
   * Twingl API. It provides a simple wrapper around resource requests (e.g.
   * GET highlights/:id) and will insert the appropriate headers, parse the
   * response appropriately.
   */
  Twingl.Resource = function (client, opts) {
    this.client = client;

    this.resourceEndpoint = opts.resourceEndpoint;
  };

  /**
   * Request wrapper
   * Designed to abstract away a lot of the common leg work associated with
   * building and executing requests and interpreting responses.
   * The thin wrapper around superagent is deliberate in order to keep the
   * internal API consistent should a more appropriate library become
   * apparent.
   */
  Twingl.Resource.prototype.request = function (url, method, cb) {
    superagent(method, url)
      .set("Authorization", "Bearer " + this.client.token)
      .set("Accept", "application/json")
      .end(function(err, res) { cb(err, res); });
  };

  /**
   * Resource#read -> GET a singular resource (e.g. /users/1)
   */
  Twingl.Resource.prototype.read = function(param, cb) {
    var url = this.client.baseUrl + this.resourceEndpoint + param;
    this.request(url, "get", function (err, res) {
      cb(JSON.parse(res.text));
    });
  };

})();
