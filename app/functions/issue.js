"use strict";
const Issuance = require("../models/Issuance");
const ObjectId = require("mongoose").Types.ObjectId;

/**
 * @function findAll
 * @returns issuances
 */
const findAll = (payload) => {
    return Issuance
        .find(
            {},
            { "__v": false }
        )
        .limit(+payload.limit)
        .skip(+payload.skip)
        .lean();
};


/**
 * @function findById
 * @returns single issuance
 */
const findById = (id) => {
    return Issuance
        .findById(
            { _id: ObjectId(id), },
            { "__v": false, }
        )
        .lean();
};

/**
 * @function findByBookId
 * @returns single issuance
 */
 const findByBookId = (id) => {
    return Issuance
        .find(
            { book: ObjectId(id), active: true },
            { "__v": false, }
        )
        .populate({
            path: "book",
            model: "Books",
            select: "_id title isbn year coverPrice avialable"
        })
        .lean();
};

/**
 * @function countAllIssuances
 * @returns no. of issuances
 */
const countAllIssuances = () => {
    return Issuance
        .countDocuments();
};

/**
 * @function updateById
 * @returns update issuance
 */
const updateById = (id, payload) => {
    return Issuance
        .updateOne(
            { _id: ObjectId(id), },
            { $set: payload, },
            { upsert: true, new: true, },
        );
};


/**
 * @function removeById
 * @returns removed issuance
 */
const removeById = (id) => {
    return Issuance
        .remove({
            _id: ObjectId(id),
        });
};

module.exports = {
    findAll,
    findById,
    findByBookId,
    updateById,
    removeById,
    countAllIssuances
};