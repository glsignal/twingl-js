describe("Twingl.Resource", function () {
  "use strict";

  var requests;

  beforeEach(function () {
    this.client = new Twingl.Client({
      baseUrl: "http://example.com",
      token: "token"
    });

    this.opts = {
      resourceEndpoint: "/foo"
    };

    this.resource = new Twingl.Resource(this.client, this.opts);

    // Fake XHR setup
    requests          = [];
    this.xhr          = sinon.useFakeXMLHttpRequest();
    this.xhr.onCreate = function (xhr) { requests.push(xhr); };
  });

  afterEach(function () {
    this.xhr.restore();
  });

  it("stores configuration options", function () {
    expect(this.resource.resourceEndpoint).toBe(this.opts.resourceEndpoint);
  });

  describe("#request", function () {
    it("sets the request headers", function (done) {
      this.resource.request("http://example.com/", "get", function () { done(); });

      expect(requests.length).toBe(1);
      expect(requests[0].requestHeaders["Authorization"]).toBe("Bearer " + this.client.token);
      expect(requests[0].requestHeaders["Accept"       ]).toBe("application/json");

      requests[0].respond(200, { "Content-Type": "application/json" }, "{}");
    });

    it("parses the response", function (done) {
      var expected = [
        { some: "object" },
        { another: "object" },
      ];

      this.resource.request("http://example.com/", "get", function (err, res) {
        expect(res).toEqual(expected);
        done();
      }, expected);

      requests[0].respond(200, { "Content-Type": "application/json" }, JSON.stringify(expected));
    });

    it("returns the error response", function (done) {
      var errorResponse = {
        error: {
          code: 404,
          message: "Record not found"
        }
      };

      this.resource.request("http://example.com/", "get", function (err, res) {
        console.log(err,res);
        expect(err).toEqual(errorResponse);
        done();
      });

      requests[0].respond(404, { "Content-Type": "application/json" }, JSON.stringify(errorResponse));
    });
  });

  describe("#index", function () {
    it("constructs the correct URL", function (done) {
      this.resource.index(function (err, res) { done(); });

      expect(requests.length).toBe(1);
      expect(requests[0].url).toBe(this.client.baseUrl + "/" + this.client.version + this.opts.resourceEndpoint);

      requests[0].respond(200, {}, "{}");
    });

    it("accepts arbitrary options to pass as URL params", function () {
      this.resource.index(function (err, res) {}, {option1:"foo", option2:"bar"});
      var urlBase = this.client.baseUrl + "/" + this.client.version + this.opts.resourceEndpoint;

      expect(requests.length).toBe(1);
      expect(requests[0].url).toBe(urlBase + "?option1=foo&option2=bar");

      requests[0].respond(200, {}, "{}");
    });
  });

  describe("#read", function () {
    it("constructs the correct URL", function (done) {
      var param = 1;
      this.resource.read(param, function (err, res) { done(); });

      expect(requests.length).toBe(1);
      expect(requests[0].url).toBe(this.client.baseUrl + "/" + this.client.version + this.opts.resourceEndpoint + "/" + param);

      requests[0].respond(200, {}, "{}");
    });
  });

  describe("#create", function () {
    it("constructs the correct URL", function (done) {
      this.resource.create({}, function (err, res) { done(); });

      expect(requests.length).toBe(1);
      expect(requests[0].url).toBe(this.client.baseUrl + "/" + this.client.version + this.opts.resourceEndpoint);

      requests[0].respond(200, {}, "{}");
    });

    it("accepts a hash of attributes for the request body", function () {
      var payload = {option1:"foo", option2:"bar"};
      this.resource.create(payload, function (err, res) {});

      expect(requests.length).toBe(1);
      expect(requests[0].requestBody).toBe(JSON.stringify(payload));

      requests[0].respond(200, {}, "{}");
    });
  });
});
