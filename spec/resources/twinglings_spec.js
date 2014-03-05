describe("Twingl.Twinglings", function () {
  "use strict";

  var requests;

  beforeEach(function () {
    this.describedResource = Twingl.Twinglings;
    this.client   = new Twingl.Client({token: "token"});
    this.resource = new Twingl.Twinglings(this.client);
    this.resourceWithParent = new Twingl.Twinglings(this.client,
      { type: "highlights", id: 1 });

    this.mockRequests = {
      index: {
        endpoint: "/twinglings",
        response: getJSONFixture("twinglings/index.json"),
        parentResource: {
          id: 1,
          type: "contexts",
          endpoint: "/highlights/1/twinglings"
        }
      },
      create: {
        endpoint: "/twinglings",
        payload: {
          start_type: "highlights",
          end_type: "highlights",
          start_id: 1,
          end_id: 2
        },
        response: getJSONFixture("twinglings/create.json")
      },
      read: {
        endpoint: "/twinglings/1",
        response: getJSONFixture("twinglings/read.1.json")
      },
      destroy: {
        id: 1,
        endpoint: "/twinglings/1"
      }
    };
  });

  describe("resource examples", itBehavesLikeAResource);
  describe("parent resource examples", itBehavesLikeAResourceWithAParentResource);
});
