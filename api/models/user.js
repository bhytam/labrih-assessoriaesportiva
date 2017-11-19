"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

module.exports = mongoose.model("User", new Schema({
    email: {
        type: String,
        unique: true
    },
    cellphone: String,
    password: String,
    cellcode: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String
    }
}));