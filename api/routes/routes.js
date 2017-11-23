"use strict";

module.exports = function (app) {
    var userController = require("../controllers/userController"),
        runnerController = require("../controllers/runnerController"),
        tamanhoCamisaController = require('../controllers/tamanhoCamisasController'),
        jwt = require("jsonwebtoken");

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");

        if ('OPTIONS' === req.method)
            res.status(200).send();
        else
            next();
    });

    app.route("/authenticate").post(userController.authenticate);

    app.route('/users/frommobile').post(userController.newuserfrommobile);

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
        .post(runnerController.post)
        .get(runnerController.list);

    app.route('/runners/:runner_id')
        .put(runnerController.put);

    app.route('/runners/advisors')
        .get(runnerController.myadvisors);

    app.route('/users/becomearunner')
        .post(userController.becomearunner);

    app.route('/tamanhoCamisas')
        .get(tamanhoCamisaController.listar);
}