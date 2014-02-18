describe("Twingl.Util", function () {
  "use strict";

  describe("::toUrlParam", function () {
    it("returns an empty string when invalid objects are passed", function () {
      expect(Twingl.Util.toUrlParam({})).toBe("");
      expect(Twingl.Util.toUrlParam()).toBe("");
    });

    it("serializes an object to URL parameters", function () {
      var object = {
        one: "test",
        two: "bar"
      };
      expect(Twingl.Util.toUrlParam(object)).toBe("?one=test&two=bar");
    });

    it("escapes URL components", function () {
      var object = {
        one: " "
      };
      expect(Twingl.Util.toUrlParam(object)).toBe("?one=%20");
    });
  });

});
