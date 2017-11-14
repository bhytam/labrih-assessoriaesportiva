'use strict';

var mongoose = require('mongoose'),
    Runner = mongoose.model('Runner')

exports.add = function(req,res) {
    var runner = new Runner(req.body);
    runner.save(function(err, r) {
        if (err) 
            res.send(err);
        res.json(r);
    });
}