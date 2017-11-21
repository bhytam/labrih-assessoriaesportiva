"use strict";

var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    Runner = mongoose.model("Runner"),
    jwt = require("jsonwebtoken"),
    smsMessager = require("../service/smsService");

exports.authenticate = function (req, res, next) {
    User.findOne({
        $or: [{
            email: req.body.email
        }, {
            cellphone: req.body.cellphone
        }],
        password: req.body.password
    }, function (err, user) {
        if (err) {
            res.status(500).send({
                success: false,
                message: "erro interno",
                data: err
            })
        } else if (!user) {
            res.json({
                success: false,
                message: "usuário não encontrado"
            })
        }
        else {
            const payload = {
                id: user._id,
                name: user.name,
                cellphone: user.cellphone
            };
            const secret = req.app.get('JwtSecret');

            var token = jwt.sign(payload, secret, {
                expiresIn: 1440
            });

            res.send(token);
        }
    });
}

exports.newuserfrommobile = function (req, res, next) {
    if (!req.body.cellphone || !req.body.cellcode)
        res.status(401).send({
            success: false,
            message: "informe o telefone e o código da instalação"
        })
    else
        User.findOne({
            cellphone: req.body.cellphone
        }, function (err, user) {
            if (err)
                res.status(500).send({
                    success: false,
                    message: "erro interno",
                    data: err
                })
            else {
                if (user && user.cellcode != req.body.cellcode)
                    res.send({
                        success: false,
                        message: "usuário já credenciado"
                    })
                else if (user) {
                    res.send({
                        success: true,
                        message: "usuário já vinculado a este telefone",
                        data: user
                    })
                }
                else {
                    var newPassword = Math.floor((Math.random() * 9999) + 1000);
                    var newUser = new User({
                        cellphone: req.body.cellphone,
                        password: newPassword,
                        cellcode: req.body.cellcode,
                        type: 'runner'
                    });
                    smsMessager.sendSms({
                        number: req.body.cellphone,
                        message: "Sua senha para o 4T é: " + newPassword
                    }).then(o => {
                        newUser.save(function (err, newUser) {
                            if (err)
                                res.status(500).send({
                                    success: false,
                                    message: "erro interno",
                                    data: err
                                })
                            else
                                res.send({
                                    success: true,
                                    data: newUser
                                });
                        })
                    }).catch(err => {
                        res.status(500).send({
                            success: false,
                            message: "erro interno",
                            data: err
                        })
                    })
                }
            }
        });
}

exports.becomearunner = function (req, res, next) {
    Runner.count({
        advisor: req.body.advisor,
        cellphone: req.decoded.cellphone
    }).then(c => { 
        if (c < 1) //não encontrou a assessoria
            res.status(401).send({
                success: false,
                message: "convite não encontrado",
                data: req.body
            })
        return c;
    }).then(c => { //atualiza todos os convites como recusados
        return Runner.update({ cellphone: req.decoded.cellphone }, { active: false });
    }).then(c => { //atualiza convite certo como aceito
        return User.update({
            cellphone: req.decoded.cellphone,
            advisor: req.body.advisor
        }, { active: true });
    }).then(o => {
        res.send({
            success: true,
            message: "atualizado com sucesso",
            data: o
        })
    }).catch(err => {
        res.status(500).send({
            success: false,
            message: "erro interno",
            data: err
        })
    })
}
