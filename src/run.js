/**
 Copyright (c) 2015 amihire. All rights reserved. See LICENSE.txt for details.
 Created by amihire on 2015.
 */
(function() {
    "use strict";

    console.log("start node server......");

    var path = require("path");
    var server = require("./server/server.js");

    var port = process.argv[2];

    server.start(port, path.resolve(__dirname, "./client"), function() {
        console.log("Server started on port " + port);
    });
}());