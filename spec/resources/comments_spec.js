describe("Twingl.Notes", function () {
  "use strict";

  var requests;

  beforeEach(function () {
    this.describedResource = Twingl.Notes;
    this.client   = new Twingl.Client({token: "token"});
    this.resource = new Twingl.Notes(this.client);
    this.resourceWithParent = new Twingl.Notes(this.client,
      { type: "contexts", id: 1 });

    this.mockRequests = {
      index: {
        endpoint: "/notes",
        response: getJSONFixture("notes/index.json"),
        parentResource: {
          id: 1,
          type: "contexts",
          endpoint: "/contexts/1/notes"
        }
      },
      create: {
        endpoint: "/notes",
        payload: {
          commentable_type: "contexts",
          commentable_id: 1,
          body: "On \"minding your pitch\" from Paul Graham."
        },
        response: getJSONFixture("notes/create.json"),
        parentResource: {
          id: 1,
          type: "contexts",
          endpoint: "/contexts/1/notes"
        }
      },
      read: {
        endpoint: "/notes/1",
        response: getJSONFixture("notes/read.1.json")
      },
      update: {
        id: 1,
        payload: { body: "An updated comment" },
        endpoint: "/notes/1",
        response: getJSONFixture("notes/update.1.json")
      },
      destroy: {
        id: 1,
        endpoint: "/notes/1"
      }
    };
  });

  describe("resource examples", itBehavesLikeAResource);
  describe("parent resource examples", itBehavesLikeAResourceWithAParentResource);
});
