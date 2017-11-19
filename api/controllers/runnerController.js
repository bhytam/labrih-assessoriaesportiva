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
    delete req.advisor;
    delete req._id;
    delete req.created_at;

    Runner.update({
        advisor: req.decoded.id,
        _id: req.params.runner_id
    }, req.body, {
            multi: false
        }, function (err, rows) {
            if (err) {
                if (err.code == 11000)
                    res.status(500).send({
                        success: false,
                        message: "este telefone já está em uso",
                        data: err
                    });
                else
                    res.status(500).send({
                        success: false,
                        message: "erro interno",
                        data: err
                    });
            }
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

    Runner.findOne({
        cellphone: req.body.cellphone,
        advisor: req.decoded.id
    }, function (err, runner) {
        if (err)
            res.status(500).send({
                success: false,
                message: "erro interno",
                data: err
            })
        else
            if (runner)
                res.status(401).send({
                    success: false,
                    message: "registro já encontrado",
                    data: runner
                })
            else
                smsService.sendSms({
                    number: "+55" + req.body.cellphone,
                    message: "Olá corredor! Estão te chamando para correr em http://www.4tapp.com"
                }).then(res => {
                    var runner = new Runner(req.body);
                    runner.advisor = req.decoded.id;
                    return runner.save();
                }).then(runner => {
                    res.send({
                        success: true,
                        message: "Salvo com sucesso",
                        data: runner
                    })
                }).catch(err => {
                    res.status(500).send({
                        success: false,
                        message: "erro interno",
                        data: err
                    })
                })
    })
}

exports.myadvisors = function (req, res) {
    Runner.find({
        cellphone: req.decoded.cellphone
    }, {
        advisor: 1
    }).populate("advisor", ["name", "cellphone", "email"])
        .then(list => {
            res.send({
                success: true,
                message: req.decoded.cellphone,
                data: list.map(o => {
                    delete o.advisor.password;
                    return o;
                })
            })
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: "erro interno",
                data: err
            })
        })
}