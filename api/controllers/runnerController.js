'use strict';

var mongoose = require('mongoose'),
    Runner = mongoose.model('Runner'),
    smsService = require("../service/smsService");

exports.list = function (req, res) {
    Runner.find({
        advisor: req.decoded.id
    }, function (err, list) {
        if (err)
            res.status(500).send({
                success: false,
                message: "erro interno",
                data: err
            });
        else
            res.send({
                success: true,
                data: list
            });
    });
}

exports.put = function (req, res) {
    Runner.update({
        advisor: req.decoded.id,
        _id: req.params.runner_id
    }, req.body, {
            multi: false
        }, function (err, rows) {
            if (err)
                res.status(500).send({
                    success: false,
                    message: "erro interno",
                    data: err
                });
            else
                res.send({
                    success: true,
                    data: rows
                });
        })
}

exports.post = function (req, res) {
    if (!req.body.cellphone || !req.body.name)
        res.status(401).send({
            success: false,
            message: "informe o telefone e o nome"
        });

    var runner = new Runner(req.body);
    runner.advisor = req.decoded.id;
    runner.save(function(err, o) {
        if (err && err.code === 11000) {
            res.status(500).send({
                success: false,
                message: "telefone duplicado"
            });
        }
        else if (err) {
            res.status(500).send({
                success: false,
                message: "erro interno",
                data: err
            });
        }
        else {
            smsService.sendSms({
                number: o.cellphone,
                message: "Olá corredor! " + req.decoded.name + " está te chamando para correr"
            });
            
            res.send({
                success: true,
                data: o
            });
        }
    });
}
