describe("Twingl.Search", function () {
  "use strict";

  var requests;

  beforeEach(function () {
    this.client = new Twingl.Client({
      baseUrl: "http://example.com",
      token: "token"
    });

    this.search = new Twingl.Search(this.client);

    // Fake XHR setup
    requests          = [];
    this.xhr          = sinon.useFakeXMLHttpRequest();
    this.xhr.onCreate = function (xhr) { requests.push(xhr); };
  });

  afterEach(function () {
    this.xhr.restore();
  });

  describe("#_search", function () {
    it("makes a request", function (done) {
      this.search._search("test", "resource", {param: "value"}, function() { done(); });

      //FIXME Expectation assumes a specific order, may be prone to breaking
      var expectedUrl = this.client.baseUrl
                      + "/" + this.client.version
                      + "/resource/search?param=value&q=test"


      expect(requests.length).toBe(1);
      expect(requests[0].url).toBe(expectedUrl);

      requests[0].respond(200, {}, "{}");
    });
  });

  describe("#all", function () {
    it("delegates to #_search", function () {
      this.search._search = sinon.spy();
      this.search.all("term", "callback", {param: "value"});

      expect(this.search._search.calledOnce).toBe(true);
      expect(this.search._search.calledWith("term", null, {param: "value"}, "callback")).toBe(true);
    });
  });

  describe("#notes", function () {
    it("delegates to #_search", function () {
      this.search._search = sinon.spy();
      this.search.notes("term", "callback", {param: "value"});

      expect(this.search._search.calledOnce).toBe(true);
      expect(this.search._search.calledWith("term", "notes", {param: "value"}, "callback")).toBe(true);
    });
  });

  describe("#highlights", function () {
    it("delegates to #_search", function () {
      this.search._search = sinon.spy();
      this.search.highlights("term", "callback", {param: "value"});

      expect(this.search._search.calledOnce).toBe(true);
      expect(this.search._search.calledWith("term", "highlights", {param: "value"}, "callback")).toBe(true);
    });
  });

});
