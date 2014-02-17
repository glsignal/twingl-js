describe("Twingl.Users", function () {
  "use strict";

  describe("#me", function () {

    var requests;

    beforeEach(function () {
      this.profile  = getJSONFixture("users/me.json");
      this.client   = new Twingl.Client({token: "token"});
      this.resource = new Twingl.Users(this.client);

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
