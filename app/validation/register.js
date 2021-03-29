"use strict";
const Validator = require("validator");

const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Making use of empty fields
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

    // Handling Min and Max character in Name Field
    if (!Validator.isLength(data.name, { min: 2, max: 30, })) {
        errors.message = "Name must be between 2 and 30 characters";
    }
    // Handling Empty Name Field
    if (Validator.isEmpty(data.name)) {
        errors.message = "Name field is required";
    }

    // Handling Empty Email Field
    if (Validator.isEmpty(data.email)) {
        errors.message = "Email field is required";
    }
    // Handling Valid Email Field
    if (!Validator.isEmail(data.email)) {
        errors.message = "Not a valid email";
    }

    // Handling Empty Password Field
    if (Validator.isEmpty(data.password)) {
        errors.message = "Password field is required";
    }
    // If Password Length is below 6
    if (!Validator.isLength(data.password, { min: 6, max: 30, })) {
        errors.message = "Password must be atleast 6 characters";
    }

    // Handling Empty Password Field
    if (Validator.isEmpty(data.confirmPassword)) {
        errors.message = "Confirm Password field is required";
    }

    // If both the passwords match
    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.message = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
