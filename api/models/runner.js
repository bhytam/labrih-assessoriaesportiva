'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = mongoose.model("Runner", new Schema({
    name: {
        type: String,
        require: "ms-05"
    },
    cellphone: {
        type: String,
        require: "ms-06",
        unique: true,
        validate: {
            validator: function (v) {
                var re = /^\d{11}$/;
                return (v == null || v.trim().length < 1) || re.test(v);
            },
            message: "ms-07"
        }
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}));