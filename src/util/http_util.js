/**
 Copyright (c) 2015 amihire. All rights reserved. See LICENSE.txt for details.
 Created by amihire on 2015.
 */
(function() {
    "use strict";

    var http = require("http");

    exports.getPage = function(url, callback) {
        var request = http.get(url);
        request.on("response", function(response) {
            var error = null;
            var responseText = "";
            response.setEncoding("utf8");

            response.on("data", function(chunk) {
                responseText += chunk;
            });
            response.on("error", function(err) {
                error = err;
            });
            response.on("end", function() {
                callback(error, response, responseText);
            });
        });
    };

}());