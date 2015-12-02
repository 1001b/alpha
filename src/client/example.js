/**
 Copyright (c) 2015 amihire. All rights reserved. See LICENSE.txt for details.
 Created by amihire on 2015.
 */
/*global dump, console */
"use strict";

var example = {};

(function() {


    var constants = require("./constants.js");

    exports.validateTextField = function validateTextField(field) {
        if (field.value) {
            field.removeAttribute("class");
        }
        else {
            field.setAttribute("class", constants.REQUIRED_FIELD_CLASS);
        }
    };

    exports.REQUIRED_FIELD_CLASS = constants.REQUIRED_FIELD_CLASS;

    exports.initializeValidation = function(textField, submitLink) {
        submitLink.addEventListener("click", function(event) {
            example.handleSubmit(textField, event);
        });
    };

    // Note: This code is only public because it needs to be called by _thin_ui_test.js
    example.handleSubmit = function(textField, event) {
        if (textField.value) return;
        event.preventDefault();
        textField.setAttribute("class", constants.REQUIRED_FIELD_CLASS);
    };

}());
