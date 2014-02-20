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
        payload: {
          context_url: "http://example.com",
          quote: "This is a new quote"
        },
        response: getJSONFixture("highlights/create.json")
      },
      read: {
        endpoint: "/highlights/1",
        response: getJSONFixture("highlights/read.1.json")
      },
      update: {
        id: 1,
        payload: { quote: "This is the amended quote" },
        endpoint: "/highlights/1",
        response: getJSONFixture("highlights/update.1.json")
      }
    };
  });

  describe("shared examples", itBehavesLikeAResource);
});
