(function() {
    "use strict";

    var version = require("../util/version_checker.js");
    var startTime = Date.now();

    task("default", [ "version" ], function(){
        var elapsedSecs = (Date.now() - startTime) / 1000;
        console.log("\n\nBuild OK (" + elapsedSecs.toFixed(2) + "s)");
    })

    task("version", function() {
        console.log("Checking all versions:");
        version.check({
            name: "Node",
            expected: require("../../package.json").engines.node,
            actual: process.version,
            strict: true
        }, complete,fail);

    },{async: true})
}());