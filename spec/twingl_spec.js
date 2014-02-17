describe("Twingl", function () {
  "use strict";

  it("stores a set of default attributes", function () {
    expect(Twingl.defaults).toEqual({
      baseUrl: "http://api.twin.gl",
      version: "v1"
    });
  });
});
