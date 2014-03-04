describe("Twingl.Highlights", function () {
  "use strict";

  var requests;

  beforeEach(function () {
    this.describedResource = Twingl.Highlights;
    this.client   = new Twingl.Client({token: "token"});
    this.resource = new Twingl.Highlights(this.client);
    this.resourceWithParent = new Twingl.Highlights(this.client,
      { type: "contexts", id: 1 });

    this.mockRequests = {
      index: {
        endpoint: "/highlights",
        response: getJSONFixture("highlights/index.json"),
        parentResource: {
          id: 1,
          type: "contexts",
          endpoint: "/contexts/1/highlights"
        }
      },
      create: {
        endpoint: "/highlights",
        payload: {
          context_url: "http://example.com",
          quote: "This is a new quote"
        },
        response: getJSONFixture("highlights/create.json"),
        parentResource: {
          id: 1,
          type: "contexts",
          endpoint: "/contexts/1/highlights"
        }
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
      },
      destroy: {
        id: 1,
        endpoint: "/highlights/1"
      }
    };
  });

  describe("resource examples", itBehavesLikeAResource);
  describe("parent resource examples", itBehavesLikeAResourceWithAParentResource);
});
