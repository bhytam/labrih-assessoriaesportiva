var mongoose = require('mongoose'),
    Atleta = mongoose.model('Atleta')

module.exports = {
    listar: function (req, res) {
        Atleta.find({
            'assessoria.usuario._id': req.decoded.usuario._id
        }).then(lista => {
            res.send({
                success: true,
                data: lista
            })
        }).catch(erro => {
            res.status(500).send({
                success: false,
                message: 'erro interno',
                data: erro
            })
        })
    },

    novoAtleta: function (req, res) {

        new Promise((s, e) => {
            if (!req.body.cpf || !res.body.numero)
                res.status(401).send({
                    success: false,
                    message: 'cpf e número obrigatórios',
                    data: req.body
                })
            return req.body;
        }).then(o => {
            return Atleta.findOne({
                $or: {
                    cpf: o.cpf,
                    numero: o.numero
                },
                'assessoria.usuario._id': req.decoded.usuario._id
            })
        }).then(atleta => {
            if (atleta)
                res.send(401).send({
                    success: false,
                    message: 'já existe',
                    data: atleta
                });
            else {
                atleta = new Atleta(req.body);
                return atleta.save();
            }
        }).then(atletaSalvo => {
            res.send({
                success: true,
                data: atletaSalvo
            })
        }).catch(e => {
            res.status(500).send({
                success: false,
                message: 'erro interno',
                data: e
            })
        })
    }
}