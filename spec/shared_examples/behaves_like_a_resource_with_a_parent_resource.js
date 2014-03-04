(function() {
  "use strict";
  /**
   * Shared suite for testing Twingl.Resource subclasses that specify a parent
   * resource.
   *
   * Required setup:
   * **this.resourceWithParent** should be an instance of the resource subclass
   * being tested, initialized with the parent information.
   *
   * **this.describedResource** should be a reference to the subclass
   *
   * **this.mockRequests** should be an object containing relevant
   * endpoint locators and response fixtures, INCLUDING the parent resource
   * information (emphasised) for example:
   *
   * this.mockRequests = {
   *  index: {
   *    endpoint: "/highlights",
   *    response: getJSONFixture("highlights/index.json"),
   * -> parentResource: {
   * ->   id: 1,
   * ->   type: "contexts",
   * ->   endpoint: "/contexts/1/highlights"
   * -> }
   *  },
   *  ...
   * }
   */

  /**
   * FIXME this shared spec needs to be improved; this isn't a particularly
   * valuable test suite. I'm leaving it here as a seed to encourage future
   * improvement
   */
  window.itBehavesLikeAResourceWithAParentResource = function () {
    describe("CRUD actions", function () {

      var requests;

      beforeEach(function () {
        // Fake XHR setup
        requests          = [];
        this.xhr          = sinon.useFakeXMLHttpRequest();
        this.xhr.onCreate = function (xhr) { requests.push(xhr); };
      });

      afterEach(function () {
        this.xhr.restore();
      });

      //TODO Improve this shared behaviour and generate tests based on what is
      //declared in the mockRequests object. This will remedy the incorrect
      //usage of 'pending' in the missing endpoints

      describe("#index", function () {
        it("makes a request", function (done) {
          if (
            Object.hasKey(this.mockRequests, "index") &&
            Object.hasKey(this.mockRequests.index, "parentResource")
          ) {
            this.resourceWithParent.index(function (err, res) { done(); });

            var expectedUrl = this.client.baseUrl + "/" + this.client.version
              + this.mockRequests["index"]["parentResource"].endpoint;

            expect(requests.length).toBe(1);
            expect(requests[0].url).toBe(expectedUrl);

            requests[0].respond(200, {}, "{}");
          }
          else { pending(); }
        });
      });

      describe("#create", function () {
        it("makes a request", function (done) {
          if (
            Object.hasKey(this.mockRequests, "create") &&
            Object.hasKey(this.mockRequests.create, "parentResource")
          ) {
            var expectedResponse = this.mockRequests["create"].response;
            var payload          = this.mockRequests["create"].payload;

            this.resourceWithParent.create(payload, function (err, res) {
              expect(res).toEqual(expectedResponse);
              done();
            });

            var expectedUrl = this.client.baseUrl + "/" + this.client.version
              + this.mockRequests["create"]["parentResource"].endpoint;

            expect(requests.length).toBe(1);
            expect(requests[0].method).toBe("post");
            expect(requests[0].requestHeaders["Content-Type"]).toBe("application/json;charset=utf-8");
            expect(requests[0].url).toBe(expectedUrl);
            expect(requests[0].requestBody).toBe(JSON.stringify(payload));

            requests[0].respond(200, {}, JSON.stringify(expectedResponse));
          } else { pending(); }
        });
      });
    });
  };

})();
