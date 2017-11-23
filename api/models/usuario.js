"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

module.exports = mongoose.model("User", new Schema({
    usuario: String,
    senha: String
}));