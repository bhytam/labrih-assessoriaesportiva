'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

module.exports = mongoose.model("Runner", new Schema({
    cellphone: {
        type: String,
        require: "qual o telefone?",
        unique: true,
        validate: {
            validator: function (v) {
                var re = /^\d{11}$/;
                return (v == null || v.trim().length < 1) || re.test(v);
            },
            message: "telefone inválido"
        }
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    advisors: [{ 
        name: {
            type: String,
            require: "entre com o nome"
        },
        advisor: {
            type: ObjectId,
            require: "qual a assessoria?"
        }
    }]
}));