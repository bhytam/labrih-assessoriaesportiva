"use strict";

var mongoose = require('mongoose'),
    Usuario = mongoose.model("Usuario");

module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");

        if ('OPTIONS' === req.method)
            res.status(200).send();
        else
            next();
    });

    app.use(function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, app.get('JwtSecret'), function (err, decoded) {
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: "token inválido"
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: "token não informado"
            });
        }
    });
}