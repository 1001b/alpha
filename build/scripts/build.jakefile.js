(function() {
    "use strict";

    var startTime = Date.now();

    task("default", function(){
        var elapsedSecs = (Date.now() - startTime) / 1000;
        console.log("\n\nBuild OK (" + elapsedSecs.toFixed(2) + "s)");
    })
}());