"use strict";
const mongoose = require("mongoose");

const connection = mongoose
    .connect("mongodb://localhost:27017/library", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connection to DB established...");
    })
    .catch(error => {
        console.error("Connection to DB failed...", error);
    });

mongoose.set("useFindAndModify", false);

module.exports = connection;
