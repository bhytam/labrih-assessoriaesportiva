"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

module.exports = mongoose.model("Usuario", new Schema({
    usuario: String,
    senha: String
}));