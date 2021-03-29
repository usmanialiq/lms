"use strict";
const Router = require("express").Router();
const Issuance = require("../models/Issuance");
const passport = require("passport");
const routes = require("../routes/index");

const {
    findAll,
    findById,
    findByBookId,
    countAllIssuances,
    updateById
} = require("../functions/issue");

const updateBook = require("../functions/book").updateById;

Router.post(
    routes.checkout,
    passport.authenticate("jwt", {session: false}),
    (req, res, next) => {
        try {
            let data = req.body;
            let newIssue = new Issuance(data)
            newIssue
                .save()
                .then(() => {
                    updateBook(data.book, {available: false})
                        .then(() => {
                            res.status(200)
                                .json({success: "Book has been checked out"});
                        })

                })
        }
        catch(error) {
            res
                .status(400)
                .json({
                    error: "System Error",
                });
            next(error);
        }
    }
);


Router.get(
    routes.checkout + "/:id",
    passport.authenticate("jwt", {session: false}),
    (req, res, next) => {
        try {
            let id = req.params.id;
            findByBookId(id)
                .then(response => {
                    res.status(200)
                        .json(response);
                })
        }
        catch(error) {
            res
                .status(400)
                .json({
                    error: "System Error",
                });
            next(error);
        }
    }
);


module.exports = Router;