"use strict";

var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    jwt = require("jsonwebtoken"),
    smsMessager = require("../service/smsService");

exports.authenticate = function (req, res) {
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

exports.newuserfrommobile = function (req, res) {
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

                console.log(req.body.cellphone);
                console.log(user);

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
