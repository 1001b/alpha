/**
 Copyright (c) 2015 amihire. All rights reserved. See LICENSE.txt for details.
 Created by amihire on 2015.
 */
(function() {
    "use strict";

    var nodeunit = require("nodeunit");

    var REPORTER = "default";

    exports.runTests = function(testFiles, success, fail) {
        nodeunit.reporters[REPORTER].run(testFiles, null, function(failures) {
            if (failures) fail("Tests failed");
            else success();
        });
    };

}());