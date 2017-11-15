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
                    data: runners.map(function(o){
                        return { cellphone: o.cellphone, name: o.advisors[0].name, id: o.id }
                    })
                })
        });
}

exports.add = function (req, res) {
    var advisorObjectId = ObjectId(req.decoded.id);
    var query = { cellphone: req.body.cellphone };

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
                            Message: "Olá " + req.body.name + "! X está te chamando para correr. Acesse Y"
                        });

                        res.status(200).json({
                            success: true,
                            message: "inserido com sucesso"
                        });
                    }
                });
            }
            else {
                if (!runner.advisors.find(o => o.advisor === advisorObjectId)) {
                    runner.advisors.push({
                        name: req.body.name,
                        advisor: advisorObjectId
                    })
                }
                runner.save(function (err, run) {
                    if (err) {
                        console.log(err);
                        res.status(500).send({
                            success: false,
                            message: "erro interno"
                        });
                    }
                    else {
                        res.json({
                            success: true,
                            message: "atualizado com sucesso"
                        })
                    };
                })
            }
        }
    });
}
