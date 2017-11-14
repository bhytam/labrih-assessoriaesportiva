"use strict";

module.exports = function (app) {
    var userController = require("../controllers/userController"),
        runnerController = require("../controllers/runnerController"),
        jwt = require("jsonwebtoken");

    app.route("/authenticate").post(userController.authenticate);

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

    app.route('/runners')
        .post(runnerController.add);
}