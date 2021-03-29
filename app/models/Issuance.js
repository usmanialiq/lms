"use strict";
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const IssuanceSchema = new mongoose.Schema({
    index: {
        type: Number,
        unique: true,
        sparse: true,
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "Books",
    },
    assignedTo: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        nic: {
            type: String,
            required: true
        },
    },
    active: {
        type: Boolean,
        default: "true",
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

IssuanceSchema.plugin(autoIncrement.plugin, {
    model: "Issuances",
    field: "index",
    unique: true,
    incrementsBy: 1,
});

const Issuance = mongoose.model("Issuances", IssuanceSchema);

module.exports = Issuance;
