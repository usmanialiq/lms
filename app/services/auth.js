"use strict";
const Auth = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const keys = require("../config/keys");
const routes = require("../routes/index");
const messages = require("../constants/messages");

// Load Validations
const validator = require("./../validation/");

const {
    findOneByEmail,
} = require("../functions/user");

/**
 * @api {post} /api/register Register a user 
 * @apiName RegisterUser
 * @apiGroup Auth
 * 
 * @apiParam {String} name Full Name field of the user
 * @apiParam {String} email Email Address field of the user
 * @apiParam {String} phone Phone Number field of the user
 * @apiParam {String} city City field of the user
 * @apiParam {String} country Country field of the user
 * @apiParam {Number} dob Date of Birth field of the user
 * @apiParam {String} password Password field of the user
 * @apiParam {String} confirmPassword Confirm password field of the user
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "success": "Account has been successfully created. Kindly Login!",
 *          "_id": "5e3fd34663b4fb237c9444f8"
 *      }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User already exists"
 *     }
 */
Auth.post(
    routes.register,
    (req, res, next) => {
        try {
            const { errors, isValid, } = validator.register(req.body);

            // Check Validation
            if (!isValid) {
                return res.status(400).json({
                    error: errors.message,
                    responseCode: 400,
                });
            }

            findOneByEmail(req.body.email)
                .then(user => {
                    if (user) {
                        return res.status(400).json({
                            error: messages.error.userExists,
                            responseCode: 400,
                        });
                    } else {

                        // Extract data of the New User
                        let newUser = req.body;
                        // Hashing Password
                        bcrypt
                            .genSalt(10)
                            .then(salt => {
                                bcrypt
                                    .hash(newUser.password, salt)
                                    .then(hash => {
                                        newUser.password = hash;
                                        // Validating with User Schema
                                        let regUser = new User(newUser);
                                        // Saving through Mongoose
                                        regUser
                                            .save()
                                            .then(genUser => {
                                                res.status(200).json({
                                                    success: messages.success.regSuccess,
                                                    _id: genUser._id,
                                                });
                                            })
                                            .catch(errSave => {
                                                return res.status(400).json({
                                                    error: errSave,
                                                    responseCode: 400,
                                                });
                                            });
                                    })
                                    .catch(errHash => {
                                        return res.status(500).json({
                                            error: errHash,
                                            responseCode: 500,
                                        });
                                    });
                            })
                            .catch(errBcrypt => {
                                return res.status(400).json({
                                    error: errBcrypt,
                                    responseCode: 400,
                                });
                            });

                    }
                })
                .catch(error => {
                    return res.status(400).json({
                        error: error,
                        responseCode: 400,
                    });
                });
        } catch (err) {
            res.status(400).json({
                error: err,
                responseCode: 400,
            });
            next(err);
        }
    });

/**
 * @api {post} /api/login Login a user 
 * @apiName loginUser
 * @apiGroup Auth
 * 
 * @apiParam {String} email Email Address of a user
 * @apiParam {String} password Password of a user
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "loginSuccess": true,
 *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDMzZjAyZTRkNDVmMWE0Yzg5ZGIzOCIsIm5hbWUiOiJKb2huIERvZSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTU4MTI0MDk3MywiZXhwIjoxNTgxMzI3MzczfQ.FDRYWGTGw0FUQPI4R7SFkRyfCRb8E3Guv_nVaQ9ctIY",
 *          "user": {
 *              "id": "5e033f02e4d45f1a4c89db38",
 *              "name": "John Doe",
 *              "type": "admin"
 *          }
 *      }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User does not exists"
 *     }
 */
Auth.post(
    routes.login,
    (req, res, next) => {
        try {
            const { errors, isValid, } = validator.login(req.body);

            // Check Validation
            if (!isValid) {
                return res.status(400).json({
                    error: errors.message,
                    responseCode: 400,
                });
            }

            // payload
            const email = req.body.email;
            const password = req.body.password;

            // Find user by email
            findOneByEmail(email)
                .then(user => {

                    // Check for user
                    if (!user) {
                        return res.status(404).json({
                            error: messages.error.noUser,
                            responseCode: 404,
                        });
                    }

                    // Check Password
                    bcrypt
                        .compare(password, user.password)
                        .then(isMatch => {
                            if (isMatch) {

                                // User Matched
                                const payload = {
                                    id: user._id,
                                    name: user.name,
                                    type: user.type,
                                };

                                // Create JWT Payload - Sign Token
                                jwt.sign(
                                    payload,
                                    keys.secretOrKey,
                                    { expiresIn: 24 * 60 * 60, },
                                    (err, token) => {
                                        if (err) throw err;

                                        // Login Success
                                        res.status(200).json({
                                            loginSuccess: true,
                                            token: token,
                                            user: payload,
                                        });
                                    }
                                );
                            } else {
                                return res.status(400).json({
                                    error: messages.error.incorrectPassword,
                                    responseCode: 400,
                                });
                            }
                        })
                        .catch(err => res.status(400).json({
                            error: err,
                            responseCode: 400,
                        })
                        );
                })
                .catch(error => {
                    res.status(400).json({
                        error: error,
                        responseCode: 400,
                    });
                });
        } catch (error) {
            res.status(500).json({
                error: error,
                responseCode: 500,
            });
            next(error);
        }
    });

module.exports = Auth;
