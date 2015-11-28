/**
 Copyright (c) 2015 amihire. All rights reserved. See LICENSE.txt for details.
 Created by amihire on 2015.
 */
(function () {
    "use strict";

    var fs = require("fs");
    var expect = require("expect.js");
    var server = require("./server.js");
    var httpUtil = require("../util/http_util.js");
    var paths = require("../../build/config/paths.js");

    var TEST_FILE = paths.testDir + "/file.txt";
    var TEST_DATA = "Hello Test";

    describe("Server", function() {

        beforeEach(function(done) {
            fs.writeFile(TEST_FILE, TEST_DATA, function(err) {
                server.start(5000, paths.testDir, function() {
                    done(err);
                });
            });
        });

        afterEach(function(done) {
            server.stop(function() {
                fs.unlink(TEST_FILE, function(err) {
                    done(err);
                });
            });
        });

        it("responds to requests", function(done) {
            httpUtil.getPage("http://localhost:5000/file.txt", function(error, response, responseText) {
                expect(response.statusCode).to.equal(200);
                expect(responseText).to.equal(TEST_DATA);
                done(error);
            });
        });

    });

}());
