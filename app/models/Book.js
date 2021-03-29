"use strict";
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const BookSchema = new mongoose.Schema({
    index: {
        type: Number,
        unique: true,
        sparse: true,
    },
    title: {
        type: String,
        required: true,
    },
    isbn: {
        type: Number,
        required: true,
    },
    coverPrice: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Number,
        default: Date.now(),
    },
    updatedAt: {
        type: Number,
        default: Date.now(),
    },
});

BookSchema.plugin(autoIncrement.plugin, {
    model: "Books",
    field: "index",
    unique: true,
    incrementsBy: 1,
});

const Book = mongoose.model("Books", BookSchema);

module.exports = Book;
