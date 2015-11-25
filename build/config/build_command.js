/**
 Copyright (c) 2015 amihire. All rights reserved. See LICENSE.txt for details.
 Created by amihire on 2015.
 */

(function() {
    "use strict";

    var UNIX_BUILD_COMMAND = "./jake.sh";
    var WINDOWS_BUILD_COMMAND = "jake.bat";

    var os = require("os");

    exports.get = function() {
        return os.platform() === "win32" ? WINDOWS_BUILD_COMMAND : UNIX_BUILD_COMMAND;
    };

}());