(function() {
  "use strict";
  /**
   * Shared suite for testing Twingl.Resource subclasses.
   *
   * Required setup:
   * **this.resource** should be an instance of the resource subclass being tested.
   * **this.describedResource** should be a reference to the subclass
   * **this.mockRequests** should be an object containing relevant
   * endpoint locators and response fixtures, for example:
   * this.mockRequests = {
   *  index: {
   *    endpoint: "/highlights",
   *    response: getJSONFixture("highlights/index.json")
   *  },
   *  read: {
   *    endpoint: "/highlights/1",
   *    response: getJSONFixture("highlights/read.json")
   *  },
   *  ...
   * }
   */

  /**
   * FIXME this shared spec needs to be improved; this isn't a particularly
   * valuable test suite. I'm leaving it here as a seed to encourage future
   * improvement
   */
  window.itBehavesLikeAResource = function () {
    it("inherits from Resource", function () {
      spyOn(Twingl,'Resource').and.callThrough();
      var instance = new this.describedResource();
      expect(Twingl.Resource).toHaveBeenCalled();
    });

    it("responds to the Resource methods", function () {
      if (this.mockRequests && Object.keys(this.mockRequests).indexOf("read") >= 0) {
        expect(typeof this.resource.index).toBe("function");
        expect(typeof this.resource.read).toBe("function");
      }
      else {
        pending();
      }
    });

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
          if (Object.hasKey(this.mockRequests, "index")) {
            this.resource.index(function (err, res) { done(); });

            var expectedUrl = this.client.baseUrl + "/" + this.client.version + this.mockRequests["index"].endpoint;

            expect(requests.length).toBe(1);
            expect(requests[0].url).toBe(expectedUrl);

            requests[0].respond(200, {}, "{}");
          } 
          else { pending(); }
        });

        it("parses the response", function (done) {
          if (Object.hasKey(this.mockRequests, "index")) {
            var expectedResponse = this.mockRequests["index"].response;

            this.resource.read(1, function (err, res) {
              expect(res).toEqual(expectedResponse);
              done();
            });

            requests[0].respond(200, { "Content-Type": "application/json" }, JSON.stringify(expectedResponse));
          }
          else { pending(); }
        });
      });

      describe("#read", function () {
        it("makes a request", function (done) {
          if (Object.hasKey(this.mockRequests, "read")) {
            this.resource.read(1, function (err, res) { done(); });

            var expectedUrl = this.client.baseUrl + "/" + this.client.version + this.mockRequests["read"].endpoint;

            expect(requests.length).toBe(1);
            expect(requests[0].url).toBe(expectedUrl);

            requests[0].respond(200, {}, "{}");
          } 
          else { pending(); }
        });

        it("parses the response", function (done) {
          if (Object.hasKey(this.mockRequests, "read")) {
            var expectedResponse = this.mockRequests["read"].response;

            this.resource.read(1, function (err, res) {
              expect(res).toEqual(expectedResponse);
              done();
            });

            requests[0].respond(200, { "Content-Type": "application/json" }, JSON.stringify(expectedResponse));
          }
          else { pending(); }
        });
      });

      describe("#create", function () {
        it("makes a request", function (done) {
          if (Object.hasKey(this.mockRequests, "create")) {
            var expectedResponse = this.mockRequests["create"].response;
            var payload = {
              context_url: "http://example.com",
              quote: "This is a quote"
            };

            this.resource.create(payload, function (err, res) {
              expect(res).toEqual(expectedResponse);
              done();
            });

            var expectedUrl = this.client.baseUrl + "/" + this.client.version + this.mockRequests["create"].endpoint;

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
