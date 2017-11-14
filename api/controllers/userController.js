"use strict";

var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    jwt = require("jsonwebtoken");

exports.authenticate = function (req, res) {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, function (err, user) {
        if (!user) {
            res.json({
                success: false,
                message: "usuário não encontrado"
            })
        }
        else {
            const payload = {
                id: user._id
            };
            const secret = req.app.get('JwtSecret');

            var token = jwt.sign(payload, secret, {
                expiresIn: 1440
            });

            res.json({
                success: true,
                message: "usuário autenticado com sucesso",
                token: token
            });
        }
    });
}

