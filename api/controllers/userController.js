"use strict";

var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    jwt = require("jsonwebtoken");

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

