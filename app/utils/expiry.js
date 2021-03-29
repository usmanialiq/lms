"use strict";
const moment = require("moment");

module.exports = {
    expiresIn: function (n) {
        let formatted = moment().add(n, "d");
        return formatted;
    },
};
