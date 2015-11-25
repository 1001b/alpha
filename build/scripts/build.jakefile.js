(function() {
    "use strict";

    var version = require("../util/version_checker.js");
    var jshint = require("simplebuild-jshint");
    var jshintConfig = require("../config/jshint.config.js");
    var startTime = Date.now();

    desc("Lint and test");
    task("default", [ "version", "lint" ], function(){
        var elapsedSecs = (Date.now() - startTime) / 1000;
        console.log("\n\nBuild OK (" + elapsedSecs.toFixed(2) + "s)");
    });

    //** LINT
    desc("Lint everything");
    task("lint", ["lintNode", "lintClient"]);

    task("lintNode", function(){
        process.stdout.write("Linting Node.js code:");
        jshint.checkFiles({
            files: ["build/**/*.js"],
            options: jshintConfig.nodeOptions,
            globals: jshintConfig.nodeGlobals
        },complete,fail);

    }, {async: true});

    task("lintClient",function(){
       process.stdout.write("Linting browser code:");
        jshint.checkFiles({
            files: ["src/client/**/*.js"],
            options: jshintConfig.clientOptions,
            globals: jshintConfig.clientGlobals
        }, complete,fail);
    },{async: true});

    //*** CHECK VERSION

    desc("Check Node version");
    task("version", function() {
        console.log("Checking all versions:");
        version.check({
            name: "Node",
            expected: require("../../package.json").engines.node,
            actual: process.version,
            strict: true
        }, complete,fail);

    },{async: true});
}());