"use strict";
const isEmpty = require("./is-empty");

module.exports = function validateVenueInput(data) {
    let errors = {};

    // Making use of empty fields
    data.bookingDetails.date = !isEmpty(data.bookingDetails.date) ? data.bookingDetails.date : "";
    data.bookingDetails.amount = !isEmpty(data.bookingDetails.amount) ? data.bookingDetails.amount : "";

    if (isEmpty(data.bookingDetails.date)) {
        errors.message = "Date in booking details is required.";
    }


    if (isEmpty(data.bookingDetails.amount)) {
        errors.message = "Amount in booking details is required.";
    }

    if (isEmpty(data.phone)) {
        errors.message = "Phone number is required";
    }

    if (isEmpty(data.cnic)) {
        errors.message = "NIC number is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
