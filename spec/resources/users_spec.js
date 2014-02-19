describe("Twingl.Users", function () {
  "use strict";

  var requests;

  beforeEach(function () {
    this.describedResource = Twingl.Users;
    this.client   = new Twingl.Client({token: "token"});
    this.resource = new Twingl.Users(this.client);

    this.mockRequests = {
      read: {
        endpoint: "/users/1",
        response: getJSONFixture("users/read.1.json")
      }
    };
  });

  describe("shared examples", itBehavesLikeAResource);

  describe("#me", function () {
    beforeEach(function () {
      this.profile  = getJSONFixture("users/me.json");

      // Fake XHR setup
      requests          = [];
      this.xhr          = sinon.useFakeXMLHttpRequest();
      this.xhr.onCreate = function (xhr) { requests.push(xhr); };
    });

    afterEach(function () {
      this.xhr.restore();
    });

    it("provides access the token owner's profile", function (done) {
      var that = this;

      this.resource.me(function (res) {
        expect(res).toEqual(that.profile);
        done();
      });

      requests[0].respond(200, { "Content-Type": "application/json" }, JSON.stringify(this.profile));
    });

  });
});
