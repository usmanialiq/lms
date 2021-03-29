"use strict";
const Users = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

const routes = require("../routes");
const messages = require("../constants/messages");
const pagination = require("../middlewares/pagination");

const {
    findAll,
    findById,
    findOneByEmail,
    findByResetCode,
    updateById,
    removeById,
} = require("../functions/user");


/**
 * @api {get} /api/users Get all the users
 * @apiName GetAllUsers
 * @apiGroup Users
 * @apiPermission admin
 * 
 * @apiParam {Number} size Page size of the data
 * @apiParam {Number} page Current page
 * 
 * @apiSuccess {Array} users Users with complete data
 * @apiSuccess {Object} meta Pagination and no. of record info
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "users": [
 *              {
 *                  "_id": "5546456456456546",
 *                  "type": "admin",
 *                  "createdAt": 1577271026589,
 *                  "name": "John Doe",
 *                  "email": "johndoe@gmail.com",
 *                  "phone": "923035636884",
 *                  "dob": 819158400000,
 *                  "city": "Karachi",
 *                  "country": "Pakistan",
 *                  "address": "B-25, North Nazimabad"
 *              }       
 *           ],
 *          "meta": {
 *                  "total": 1,
 *                  "pageSize": 30,
 *                  "skip": 0
 *           }    
 *      }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No users in the system"
 *     }
 */
Users.get(
    routes.users,
    passport.authenticate("jwt", { session: false, }),
    (req, res, next) => {
        try {
            if (req.user.type === "admin") {
                let query = pagination(req.query);
                findAll(query)
                    .then(users => {
                        res.status(200)
                            .json({
                                users: users,
                                meta: {
                                    total: users.length,
                                    pageSize: query.size,
                                    skip: query.skip,
                                },
                            });
                    })
                    .catch(error => {
                        res
                            .status(400)
                            .json({
                                error: messages.error.getAllUsers,
                            });
                        next(error);
                    });
            }
            else {
                res
                    .status(402)
                    .json({
                        error: messages.error.adminOnly,
                    });
            }
        }
        catch (error) {
            res
                .status(400)
                .json({
                    error: messages.error.usersGenError,
                });
            next(error);
        }
    }
);

/**
 * @api {get} /api/users/:id Get a user by id
 * @apiName GetUserById
 * @apiGroup Users
 * 
 * @apiParam {String} id ID of the user
 * 
 * @apiSuccess {String} _id ID of the user
 * @apiSuccess {String} type Type of the user
 * @apiSuccess {Number} createdAt When the user was created
 * @apiSuccess {String} name Name of the user
 * @apiSuccess {String} email Email Address of the user
 * @apiSuccess {String} phone Phone Number of the user
 * @apiSuccess {Number} dob Date of birth of the user
 * @apiSuccess {String} city City of the user
 * @apiSuccess {String} country Country of the user
 * @apiSuccess {String} address Address of the user
 * 
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "_id": "5546456456456546",
 *          "type": "admin",
 *          "createdAt": 1577271026589,
 *          "name": "John Doe",
 *          "email": "johndoe@gmail.com",
 *          "phone": "923035636884",
 *          "dob": 819158400000,
 *          "city": "Karachi",
 *          "country": "Pakistan",
 *          "address": "B-25, North Nazimabad"
 *      }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No such user in the system"
 *     }
 */
Users.get(
    routes.users + "/:id",
    passport.authenticate("jwt", { session: false, }),
    (req, res, next) => {
        try {
            let id = req.params.id;
            findById(id)
                .then(user => {
                    res
                        .status(200)
                        .json(user);
                })
                .catch(error => {
                    res
                        .status(400)
                        .json({
                            error: messages.error.getUserById,
                        });
                    next(error);
                });
        }
        catch (error) {
            res
                .status(400)
                .json({
                    error: messages.error.usersGenError,
                });
            next(error);
        }
    }
);

/**
 * @api {get} /api/users/:email/email Get a user by email
 * @apiName GetUserByEmail
 * @apiGroup Users
 * 
 * @apiParam {String} email Email Address of the user
 * 
 * @apiSuccess {String} success Success message
 * @apiSuccess {String} _id ID of the user
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "success": "User with this email exists",
 *          "_id": "5546456456456546"    
 *      }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No such user in the system"
 *     }
 */
Users.get(
    routes.users + "/:email/email",
    (req, res, next) => {
        try {
            let email = req.params.email;
            findOneByEmail(email)
                .then(user => {
                    if (user) {
                        res
                            .status(200)
                            .json({
                                success: messages.success.userVerified,
                                _id: user._id,
                            });
                    }
                    else if (!user) {
                        res
                            .status(404)
                            .json({
                                error: messages.error.noUser,
                            });
                    }
                })
                .catch(error => {
                    res
                        .status(400)
                        .json({
                            error: messages.error.usersGenError,
                        });
                    next(error);
                });
        }
        catch (error) {
            res
                .status(400)
                .json({
                    error: messages.error.usersGenError,
                });
            next(error);
        }
    }
);

/**
 * @api {put} /api/users/:id Update a user by id
 * @apiName UpdateUser
 * @apiGroup Users
 * @apiPermission admin
 * 
 * @apiParam {String} id ID of the user
 * 
 * @apiSuccess {String} success Success message
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "success": "User has been successfully updated"    
 *      }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No such user in the system"
 *     }
 */
Users.put(
    routes.users + "/:id",
    passport.authenticate("jwt", { session: false, }),
    (req, res, next) => {
        try {
            if (req.user.type === "admin") {
                let id = req.params.id;
                updateById(id, req.body)
                    .then(user => {
                        if (user) {
                            res
                                .status(200)
                                .json({
                                    success: messages.success.userUpdated,
                                });
                        }
                    })
                    .catch(error => {
                        res
                            .status(400)
                            .json({
                                error: messages.error.usersGenError,
                            });
                        next(error);
                    });
            }
            else {
                res
                    .status(405)
                    .json({
                        error: messages.error.adminOnly,
                    });
            }
        }
        catch (error) {
            res
                .status(400)
                .json({
                    error: messages.error.usersGenError,
                });
            next(error);
        }
    }
);

/**
 * @api {put} /api/users/:code/changePassword Update password of a user by id
 * @apiName ChangePassword
 * @apiGroup Users
 * 
 * @apiParam {String} code Get a user by code and allow it to change password
 * 
 * @apiSuccess {String} success Success message
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "success": "Password has been successfully updated"    
 *      }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Password could not be updated"
 *     }
 */
Users.put(
    routes.users + "/:code/changePassword",
    passport.authenticate("jwt", { session: false, }),
    (req, res, next) => {
        try {
            let code = req.params.code;
            let confirmPassword = req.body.confirmPassword;
            let newPassword = req.body.newPassword;
            if (!confirmPassword) {
                return res.status(404)
                    .json({
                        error: messages.error.confirmPassword,
                    });
            }
            if (!newPassword) {
                return res.status(404)
                    .json({
                        error: messages.error.newPassword,
                    });
            }
            if (confirmPassword !== newPassword) {
                return res.status(400)
                    .json({
                        error: messages.error.passwordMismatch,
                    });
            }
            findByResetCode(code)
                .then(user => {
                    if (user !== null) {
                        bcrypt
                            .genSalt(10)
                            .then(salt => {
                                bcrypt
                                    .hash(newPassword, salt)
                                    .then(hash => {
                                        let data = {
                                            password: hash,
                                        };
                                        updateById(user._id, data)
                                            .then(user => {
                                                if (user) {
                                                    res
                                                        .status(200)
                                                        .json({
                                                            success: messages.success.userPasswordUpdated,
                                                        });
                                                }
                                            })
                                            .catch(error => {
                                                res
                                                    .status(400)
                                                    .json({
                                                        error: messages.error.usersGenError,
                                                    });
                                                next(error);
                                            });
                                    })
                                    .catch(error => {
                                        res.status(400)
                                            .json({
                                                error: messages.error.fPGenError,
                                            });
                                        next(error);
                                    });
                            })
                            .catch(error => {
                                res.status(400)
                                    .json({
                                        error: messages.error.fPGenError,
                                    });
                                next(error);
                            });
                    }
                })
                .catch(error => {
                    res
                        .status(400)
                        .json({
                            error: messages.error.usersGenError,
                        });
                    next(error);
                });
        }
        catch (error) {
            res
                .status(400)
                .json({
                    error: messages.error.usersGenError,
                });
            next(error);
        }
    }
);

/**
 * @api {delete} /api/users/:id Delete a user by id
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiPermission admin
 * 
 * @apiParam {String} _id ID of the user
 * 
 * @apiSuccess {String} success Success message
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "success": "User has been deleted"   
 *      }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 */
Users.delete(
    routes.users + "/:id",
    passport.authenticate("jwt", { session: false, }),
    (req, res, next) => {
        try {
            if (req.user.type === "admin") {
                let id = req.params.id;
                removeById(id)
                    .then(user => {
                        if (user) {
                            res
                                .status(200)
                                .json({
                                    success: messages.success.userDeleted,
                                });
                        }
                    })
                    .catch(error => {
                        res
                            .status(400)
                            .json({
                                error: messages.error.usersGenError,
                            });
                        next(error);
                    });
            } else {
                res
                    .status(405)
                    .json({
                        error: messages.error.adminOnly,
                    });
            }
        }
        catch (error) {
            res
                .status(400)
                .json({ error: messages.error.usersGenError, });
            next(error);
        }
    }
);

module.exports = Users;
