"use strict";
const Router = require("express").Router();
const passport = require("passport");
const _ = require("lodash");
const Book = require("../models/Book");
const routes = require("../routes/index");
const messages = require("../constants/messages");
const pagination = require("../middlewares/pagination");
const generateRandom = require("../utils/pinGenerate");

const {
    countAllBooks,
    findAll,
    findById,
    updateById
} = require("../functions/book");

/**
 * @api {post} /api/books Create a book 
 * @apiName CreateNewBook
 * @apiGroup Books
 * 
 * @apiParam {String} title Title of the book
 * @apiParam {String} category Category of the book
 * @apiParam {Number} costPrice Cost Price of the book
 * @apiParam {Number} salePrice Sale Price of the book
 * @apiParam {String} desc Description of the book
 * @apiParam {String} moreInfo More Information of the book
 * @apiParam {Object} dataSheet Data Sheet of the book
 * @apiParam {String} status Status of the book
 * 
 */
Router.post(
    routes.books,
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
        try {
            let data = req.body;
            let randomString = generateRandom(4, 1);
            data.slug = _.kebabCase(`${req.body.title} ${randomString}`);
            data.createdBy = req.user._id;
            let newBook = new Book(data);
            newBook
                .save()
                .then(() => {
                    res.status(201)
                        .json({
                            success: messages.success.bookAdded
                        })
                })
                .catch(error => {
                    res
                        .status(400)
                        .json({error: error})
                });
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


/**
 * @api {get} /api/books Get all the books 
 * @apiName GetAllBooks
 * @apiGroup Books
 * 
 */
 Router.get(
    routes.books,
    (req, res, next) => {
        try {
            let query = pagination(req.query);
            findAll(query)
                .then(books => {
                    countAllBooks()
                        .then(count => {
                            res.status(200)
                                .json({
                                    books: books,
                                    meta: {
                                        total: count.length,
                                        pageSize: query.size,
                                        skip: query.skip,
                                    },
                                });
                        });
                });
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


/**
 * @api {get} /api/books/:id/admin Get a book by id 
 * @apiName GetABookByID
 * @apiGroup Books
 * 
 * 
 */
 Router.get(
    routes.books + "/:id",
    passport.authenticate("jwt", { session: false, }),
    (req, res, next) => {
        try {
            let id = req.params.id;
            findById(id)
                .then(product => {
                    res.status(200)
                        .json(product);
                });
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

/**
 * @api {put} /api/books/:id Update a book by id 
 * @apiName UpdateABookById
 * @apiGroup Books
 * 
 */
 Router.put(
    routes.books + "/:id",
    passport.authenticate("jwt", { session: false, }),
    (req, res, next) => {
        try {
            if(req.user.type === "admin") {
                let id = req.params.id;
                if (!id) {
                    return res.status(403)
                        .json({
                            error: messages.error.invalidId,
                        });
                }
                let data = req.body;
                data.updatedBy = Date.now();
                updateById(id, data)
                    .then(product => {
                        if (product) {
                            res
                                .status(200)
                                .json({
                                    success: messages.success.tripUpdated,
                                });
                        }
                    })
                    .catch(error => {
                        res
                            .status(400)
                            .json({
                                error: messages.error.updateTripById,
                            });
                        next(error);
                    });
            }
            else {
                return res
                    .status(400)
                    .json({
                        error: messages.error.adminOnly
                    });
            }
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