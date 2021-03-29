"use strict";
const Book = require("../models/Book");
const ObjectId = require("mongoose").Types.ObjectId;

/**
 * @function findAll
 * @returns books
 */
const findAll = (payload) => {
    let filters = {};
    if (payload.keyword && payload.keyword.length > 0) {
        let bookTitle = new RegExp(payload.keyword, "i");
        filters["title"] = bookTitle;
    }
    return Book
        .find(
            filters,
            { "__v": false, createdBy: false, }
        )
        .limit(+payload.limit)
        .skip(+payload.skip)
        .lean();
};


/**
 * @function findById
 * @returns single book
 */
const findById = (id) => {
    return Book
        .findById(
            { _id: ObjectId(id), },
            { "__v": false, }
        )
        .populate({
            path: "createdBy",
            model: "Users",
            select: "_id name type email",
        })
        .lean();
};

/**
 * @function countAllBooks
 * @returns no. of books
 */
const countAllBooks = () => {
    return Book
        .countDocuments();
};

/**
 * @function updateById
 * @returns update book
 */
const updateById = (id, payload) => {
    return Book
        .updateOne(
            { _id: ObjectId(id), },
            { $set: payload, },
            { upsert: true, new: true, },
        );
};


/**
 * @function removeById
 * @returns removed book
 */
const removeById = (id) => {
    return Book
        .remove({
            _id: ObjectId(id),
        });
};

/**
 * @function searchByText
 * @returns search the product
 */
const searchByText = (text) => {
    return Book
        .find({
            $text: {
                $search: text,
            },
        }, 
        { "__v": false, createdBy: false, })
        .lean();
};

module.exports = {
    findAll,
    findById,
    updateById,
    removeById,
    searchByText,
    countAllBooks
};