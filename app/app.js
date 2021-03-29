"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const mongoSanitize = require('express-mongo-sanitize');
const xss = require("xss-clean");

/////////////////
// router module
////////////////
const router = require("./services/index");

////////////////////////////
// Initializing express app
////////////////////////////
const app = express();

/////////////////////
// Connection to DB
////////////////////
require("./db/connection");

///////////////
// Middlewares
//////////////
app.use(logger("combined"));
app.use(express.json({
    limit: "1024kb",
}));
app.use(express.urlencoded({
    extended: false,
    limit: "1024kb",
}));
app.use(mongoSanitize());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
}));
app.use(passport.initialize());
require("./config/passport")(passport);
app.use(cookieParser());
app.use(helmet());
app.use(xss());

/////////////////
// Route handler
////////////////
app.use(
    "/api",
    router.auth,
    router.users,
    router.books,
    router.issue
);

///////////////////////
// Error route handler
//////////////////////
app.use("*", (req, res, next) => {
    try {
        res.status(404).json({
            name: "ResourceNotFoundError",
            error: `${req.method} ${req.baseUrl} does not exist`,
        });
    }
    catch (error) {
        res.json(error);
        next(error);
    }
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.name === "UnauthorizedError") {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message, });
    } else {
        res.status(500).json(err);
        next();
    }
});

module.exports = app;
