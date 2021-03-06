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

    this.parentResource = opts.parentResource;
  };

  /**
   * Request wrapper
   * Designed to abstract away a lot of the common leg work associated with
   * building and executing requests and interpreting responses.
   * The thin wrapper around superagent is deliberate in order to keep the
   * internal API consistent should a more appropriate library become
   * apparent.
   */
  Twingl.Resource.prototype.request = function (url, method, cb, attributes) {
    var request = superagent(method, url)
      .set("Authorization", "Bearer " + this.client.token)
      .set("Accept", "application/json");

    if (attributes) {
      request.set('Content-Type', 'application/json');
      request.send(attributes);
    }

    request.end(function(err, res) {
      if (err) {
        /**
         * If there's an error present, bubble it up to the consumer
         */ 
        cb(err, res);
      } else {
        if (res.statusType === 4 || res.statusType === 5) {
          cb(JSON.parse(res.text), res);
        } else if (res.status === 204) {
          cb(err, res);
        } else {
          cb(err, JSON.parse(res.text));
        }
      }
    });
  };

  /**
   * GET Resource#index -> retrieve a collection of resources (e.g. /users)
   */
  Twingl.Resource.prototype.index = function(cb, params) {
    var queryParams = Twingl.Util.toUrlParam(params);
    var urlBase = this.client.baseUrl + "/" + this.client.version;

    if (this.parentResource && this.parentResource.id && this.parentResource.type) {
      urlBase += "/" + this.parentResource.type + "/" + this.parentResource.id;
    }

    var url = urlBase + this.resourceEndpoint + queryParams;
    this.request(url, "get", cb);
  };

  /**
   * GET Resource#read -> read a singular resource (e.g. /users/1)
   */
  Twingl.Resource.prototype.read = function(id, cb) {
    var url = this.client.baseUrl + "/" + this.client.version + this.resourceEndpoint + "/" + id;
    this.request(url, "get", cb);
  };

  /**
   * POST Resource#create -> attempt to create a resource with `attributes`
   */
  Twingl.Resource.prototype.create = function(attributes, cb) {
    var urlBase = this.client.baseUrl + "/" + this.client.version;

    if (this.parentResource && this.parentResource.id && this.parentResource.type) {
      urlBase += "/" + this.parentResource.type + "/" + this.parentResource.id;
    }

    var url = urlBase + this.resourceEndpoint;
    this.request(url, "post", cb, attributes);
  };

  /**
   * PUT Resource#update -> update a resource with new `attributes`
   */
  Twingl.Resource.prototype.update = function(id, attributes, cb) {
    var url = this.client.baseUrl + "/" + this.client.version + this.resourceEndpoint + "/" + id;
    this.request(url, "put", cb, attributes);
  };

  /**
   * DELETE Resource#destroy -> destroy a resource
   */
  Twingl.Resource.prototype.destroy = function(id, cb) {
    var url = this.client.baseUrl + "/" + this.client.version + this.resourceEndpoint + "/" + id;
    this.request(url, "delete", cb);
  };
})();
