'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var runnerSchema = Schema({
    cellphone: String,
    name: String,
    email: String,
    advisor: Schema.Types.ObjectId,
    created_at: {
        type: Date,
        default: Date.now
    }
});

runnerSchema.index({ advisor: 1, cellphone: 1 }, { unique: true });

module.exports = mongoose.model("Runner", runnerSchema);