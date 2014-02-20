describe("Twingl.Highlights", function () {
  "use strict";

  var requests;

  beforeEach(function () {
    this.describedResource = Twingl.Highlights;
    this.client   = new Twingl.Client({token: "token"});
    this.resource = new Twingl.Highlights(this.client);

    this.mockRequests = {
      index: {
        endpoint: "/highlights",
        response: getJSONFixture("highlights/index.json")
      },
      create: {
        endpoint: "/highlights",
        response: getJSONFixture("highlights/create.json")
      },
      read: {
        endpoint: "/highlights/1",
        response: getJSONFixture("highlights/read.1.json")
      }
    };
  });

  describe("shared examples", itBehavesLikeAResource);
});
