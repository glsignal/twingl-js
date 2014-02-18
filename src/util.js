(function() {
  "use strict";

  window.Twingl = window.Twingl || {};

  /**
   * The Util "class" is a collection of utility functions used elsewhere in
   * the library.
   */
  Twingl.Util = {
    toUrlParam: function(obj) {
      var str = "";
      for (var key in obj) {
        if (str === "")  str += "?";
        if (str !== "?") str += "&";
        str += encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
      }
      return str;
    }
  };

})();
