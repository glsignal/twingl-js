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
  });

  describe("#index", function () {
    it("constructs the correct URL", function (done) {
      this.resource.index(function (res) { done(); });

      expect(requests.length).toBe(1);
      expect(requests[0].url).toBe(this.client.baseUrl + "/" + this.client.version + this.opts.resourceEndpoint);

      requests[0].respond(200, {}, "{}");
    });

    it("accepts arbitrary options to pass as URL params", function () {
      this.resource.index(function (res) {}, {option1:"foo", option2:"bar"});
      var urlBase = this.client.baseUrl + "/" + this.client.version + this.opts.resourceEndpoint;

      expect(requests.length).toBe(1);
      expect(requests[0].url).toBe(urlBase + "?option1=foo&option2=bar");

      requests[0].respond(200, {}, "{}");
    });

    it("parses the response", function (done) {
      var expected = [
        { some: "object" },
        { another: "object" },
      ];

      this.resource.index(function (res) {
        expect(res).toEqual(expected);
        done();
      });

      requests[0].respond(200, { "Content-Type": "application/json" }, JSON.stringify(expected));
    });
  });

  describe("#read", function () {
    it("constructs the correct URL", function (done) {
      var param = 1;
      this.resource.read(param, function (res) { done(); });

      expect(requests.length).toBe(1);
      expect(requests[0].url).toBe(this.client.baseUrl + "/" + this.client.version + this.opts.resourceEndpoint + "/" + param);

      requests[0].respond(200, {}, "{}");
    });

    it("parses the response", function (done) {
      var expected = { some: "object" };

      this.resource.read(1, function (res) {
        expect(res).toEqual(expected);
        done();
      });

      requests[0].respond(200, { "Content-Type": "application/json" }, JSON.stringify(expected));
    });
  });

});
