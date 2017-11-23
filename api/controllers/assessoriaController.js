var mongooose = require('mongoose'),
    Assessoria = mongooose.model('Assessoria');

module.exports = {
    listarTamanhosCamisa: function(req, res) {
        Assessoria.findOne({ usuario: req.decoded.usuario._id }, 'tamanhosCamisa')
            .then(a => {
                res.send({
                    success: true,
                    data: a.tamanhosCamisa
                });
            }).catch(e => {
                res.send(500).send({
                    success: false,
                    message: 'erro interno',
                    data: err
                })
            })
    }
}