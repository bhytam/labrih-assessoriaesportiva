'use strict';

var mongoose = require('mongoose'),
    Runner = mongoose.model('Runner'),
    smsService = require("../service/smsService"),
    ObjectId = mongoose.Types.ObjectId;

exports.list = function (req, res) {
    var advisorObjectId = ObjectId(req.decoded.id);
    Runner.find(
        { "advisors.advisor": advisorObjectId },
        function (err, runners) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    success: false,
                    message: "erro interno"
                })
            }
            else
                res.status(200).send({
                    success: true,
                    data: runners.map(function (o) {
                        return { cellphone: o.cellphone, name: o.advisors[0].name, id: o.id }
                    })
                })
        });
}

exports.put = function (req, res) {
    var query = {
        _id: req.params.runner_id,
        'advisors.advisor': req.decoded.id
    };

    Runner.findOne(query)
        .then((model) => {
            model.advisors = model.advisors.map(function (a) {
                if (a.advisor == req.decoded.id)
                    a.name = req.body.name;
                return a;
            });
            console.log(model);
            return model;
        }).then((modelWithChanges) => {
            return modelWithChanges.save();
        })
        .then((modelInBase) => {
            res.status(200).send({
                success: true,
                message: "atualizado com sucesso",
                data: modelInBase
            })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({
                success: false,
                message: "erro interno"
            })
        });
}

exports.post = function (req, res) {
    var advisorObjectId = ObjectId(req.decoded.id);
    var query = { cellphone: req.body.cellphone };

    if (req.body.cellphone == undefined)
        res.status(400).send({
            success: false,
            message: "telefone obrigatório"
        });

    Runner.findOne(query, function (err, runner) {
        if (err) res.send(err);
        else {
            if (!runner) {
                runner = new Runner();
                runner.cellphone = req.body.cellphone;
                runner.advisors = [{
                    name: req.body.name,
                    advisor: advisorObjectId
                }]
                runner.save(function (err, run) {
                    if (err) {
                        console.log(err);
                        res.status(500).send({
                            success: false,
                            message: "erro interno"
                        })
                    }
                    else {
                        smsService.sendSms({
                            Number: runner.cellphone,
                            Message: "Olá corredor! " + req.decoded.name + " está te chamando para correr. Acesse Y"
                        });

                        res.status(200).json({
                            success: true,
                            message: "inserido com sucesso",
                            data: run
                        });
                    }
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "registro já existente"
                })
            }
        }
    });
}
