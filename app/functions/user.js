"use strict";
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

/**
 * @function findAll
 * @returns users
 */
const findAll = (payload) => {
    return User
        .find({},
            "_id name email type phone state city addressStr postalCode createdAt"
        )
        .limit(+payload.pageSize)
        .skip(+payload.skip)
        .lean();
};

/**
 * @function findCustomers
 * @returns customers
 */
const findCustomers = () => {
    return User
        .find({
            type: "customer"
        })
        .lean();
};

/**
 * @function findOneByEmail
 * @returns single user
 */
const findOneByEmail = (email) => {
    return User
        .findOne({
            email: email,
        })
        .lean();
};

/**
 * @function findById
 * @returns single user
 */
const findById = (id) => {
    return User
        .findById(
            {
                _id: ObjectId(id),
            },
            { 
                "__v": false, 
                password: false, 
                misc: false, 
            }
        )
        .lean();
};

/**
 * @function findByResetCode
 * @returns single user
 */
const findByResetCode = code => {
    return User
        .findOne({
            misc: {
                resetPasswordCode: code,
            },
        })
        .lean();
};

/**
 * @function countUsers
 * @returns no. of users
 */
const countUsers = () => {
    return User
        .countDocuments();
};

/**
 * @function updateById
 * @returns updated users
 */
const updateById = (id, payload) => {
    return User
        .updateOne(
            { _id: ObjectId(id), },
            { $set: payload, },
            { upsert: true, new: true, },
        );
};

/**
 * @function removeById
 * @returns removed users
 */
const removeById = (id) => {
    return User
        .remove({
            _id: ObjectId(id),
        });
};

module.exports = {
    findAll,
    findOneByEmail,
    findById,
    findByResetCode,
    countUsers,
    updateById,
    removeById,
    findCustomers
};