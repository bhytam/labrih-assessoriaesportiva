var mongoose = require('mongoose'),
    Atleta = mongoose.model('Atleta')

module.exports = {
    listar: function(req, res) {
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
    }
}