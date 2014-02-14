describe("Twingl.Client", function () {
  "use strict";

  it("stores an API token", function () {
    var client = new Twingl.Client({token: "token"});
    expect(client.token).toBe("token");
  });

  it("has a default base url", function() {
    var client = new Twingl.Client({token: "token"});
    expect(client.baseUrl).toBe(Twingl.defaults.baseUrl);
  });

  it("accepts an alternate API base url", function() {
    var client = new Twingl.Client({token: "token", baseUrl: "http://sandbox.twin.gl"});
    expect(client.baseUrl).toBe("http://sandbox.twin.gl");
  });
});
