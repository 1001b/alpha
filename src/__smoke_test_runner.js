/**
 Copyright (c) 2015 amihire. All rights reserved. See LICENSE.txt for details.
 Created by amihire on 2015.
 */

// Basic end-to-end test of server to make sure everything's hooked up.

(function() {
    "use strict";
    var httpUtil = require("./__http_util.js");

    var HOME_PAGE_MARKER = "automatopia home page";

    exports.runTests = function(url, callback) {
        checkMarker(url, HOME_PAGE_MARKER, function(foundMarker) {
            if (!foundMarker) console.log("Did not find home page marker");
            callback(foundMarker);
        });
    };

    function checkMarker(url, marker, callback) {
        httpUtil.getPage(url, function(error, response, responseText) {
            var foundMarker = responseText.indexOf(marker) !== -1;
            callback(foundMarker);
        });
    }
}());