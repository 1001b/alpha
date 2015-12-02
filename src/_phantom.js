/**
 Copyright (c) 2015 amihire. All rights reserved. See LICENSE.txt for details.
 Created by amihire on 2015.
 */

/*global phantom, document, example,window */

(function() {
    "use strict";

    var URL = "http://localhost:5000";
    var bundleJS = "bundle.js";

    var page = require("webpage").create();

    page.onConsoleMessage = function(message) {
        console.log("CONSOLE: " + message);
    };

    page.open(URL, function(success) {
        //debugger;
        if (success !== "success") die("PhantomJS could not load " + URL);

        try {
            var error;

            error = inBrowserTest();

            if (error) die(error);
            else phantom.exit(0);
        }
        catch(err) {
            die("Exception from PhantomJS: " + err.stack);
        }
    });

    function inBrowserTest() {

        var msg;

        //Must include the page javascript, otherwise remote debugging will not work
        page.includeJs(URL + "/" + bundleJS, page.evaluate(function() {
            try {
                // Get the DOM elements
                var textField = document.getElementById("text_field");
                var submitLink = document.getElementById("submit_link");

                // Click the submit link (note: submitLink.click() is not supported by PhantomJS at the time of this writing)
                var event = document.createEvent("MouseEvents");
                event.initMouseEvent("click");
                submitLink.dispatchEvent(event);

                // Check the CSS class
                var actual = textField.className;
                var expected = example.REQUIRED_FIELD_CLASS;

                console.log("textField class expected " + expected + " and was " + actual)  ;

                if (actual !== expected) {
                    msg = "textField class expected " + expected + " but was " + actual;
                }
                else msg = null;
            }
            catch(err) {
                msg = "Exception in PhantomJS browser code (IN): " + err.stack;
            }
        }));
    }

    //option of user interaction testing
    function userInteractionTest() {
        // Get validate button location
        var location = page.evaluate(function() {
            try {
                var submitLink = document.getElementById("submit_link");
                var bounds = submitLink.getBoundingClientRect();
                return {
                    x: bounds.left,
                    y: bounds.top
                };
            }
            catch(err) {
                return "Exception in PhantomJS browser code (USER): " + err.stack;
            }
        });

        // Click the submit link
        page.sendEvent("click", location.x, location.y);

        // Check the CSS class
        return page.evaluate(function() {
            try {
                var textField = document.getElementById("text_field");
                var actual = textField.className;
                var expected = example.REQUIRED_FIELD_CLASS;
                if (actual !== expected) return "textField class expected " + expected + " but was " + actual;
                else return null;
            }
            catch(err) {
                return "Exception in PhantomJS browser code: " + err.stack;
            }
        });
    }

    function die(error) {
        console.log(error);
        phantom.exit(1);
        // Note: exit() doesn't take effect until the next tick. So if you call exit(0)
        // after calling die(), PhantomJS will exit with errorcode 0, not errorcode 1. Be careful!
    }

}());