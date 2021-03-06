"use strict";

var mongoose = require('mongoose'),
    Usuario = mongoose.model("Usuario"),
    jwt = require('jsonwebtoken'),
    assessoriaController = require('../controllers/assessoriaController'),
    atletaController = require('../controllers/atletaController');

var assessoriaService = require('../service/assessoriaService');

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

    app.route('/autenticar')
        .post(async (req, res) => {
            try {
                var usuario = await Usuario.findOne({
                    usuario: req.body.usuario,
                    senha: req.body.senha
                });

                if (!usuario) {
                    res.status(401).send({
                        success: false,
                        message: 'usuário não encontrado'
                    })
                    return;
                }

                var assessoria = await assessoriaService.buscarAssessoriaDoUsuario(usuario._id);

                const payload = {
                    usuario: usuario,
                    assessoria: assessoria
                };

                var token = jwt.sign(payload, app.get('JwtSecret'), {
                    expiresIn: "1 day"
                });

                res.send(token);
            } catch (e) {
                res.status(500).send({
                    success: false,
                    message: 'erro interno',
                    data: e
                })
            }
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

    app.route('/assessoria/tamanhoscamisa').get(assessoriaController.listarTamanhosCamisa);

    app.route('/assessoria/nucleos').get(assessoriaController.listarNucleos);

    app.route('/assessoria/atletas')
        .get(atletaController.listar)
        .post(atletaController.novoAtleta);

    app.route('/assessoria/atletas/:_id')
        .put(atletaController.atualizar)
        .get(atletaController.obter);
}