/**
 Copyright (c) 2015 amihire. All rights reserved. See LICENSE.txt for details.
 Created by amihire on 2015.
 */
(function() {
    "use strict";

    var constants = require("./constants.js");

    exports.validateTextField = function validateTextField(field) {
        if (field.value) {
            field.removeAttribute("class");
        }
        else {
            field.setAttribute("class", constants.REQUIRED_FIELD_CLASS);
        }
    };

}());
