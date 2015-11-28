/**
 Copyright (c) 2015 amihire. All rights reserved. See LICENSE.txt for details.
 Created by amihire on 2015.
 */
(function() {
    "use strict";

    var httpServer = require("http-server");
    var server;

    exports.start = function(portNumber, dirToServe, callback) {
        server = httpServer.createServer({
            root: dirToServe
        });
        server.listen(portNumber, callback);
    };

    exports.stop = function(callback) {
        // Technically, we're poking into HttpServer's private data here. Bad us. The http-server module is just a
        // placeholder, and it doesn't have a callback for server.close(). Bad http-server. So don't use this code.
        // Write something better.
        server.server.close(callback);
    };

}());