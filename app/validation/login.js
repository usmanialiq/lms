"use strict";
const Validator = require("validator");

const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    // Making use of empty  fields
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Handling Empty Email Field
    if (Validator.isEmpty(data.email)) {
        errors.message = "Email is required";
    }

    // Handling Empty Password Field
    if (Validator.isEmpty(data.password)) {
        errors.message = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
