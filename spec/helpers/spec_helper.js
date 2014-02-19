(function() {
  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = "spec/fixtures";
    jasmine.getJSONFixtures().fixturesPath = "spec/fixtures";
  });

  Object.hasKey = function(o, k) {
    return (Object.keys(o).indexOf(k) >= 0);
  };
})();
