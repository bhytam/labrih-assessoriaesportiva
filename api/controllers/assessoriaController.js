var mongooose = require('mongoose'),
    Assessoria = mongooose.model('Assessoria');

module.exports = {
    listarTamanhosCamisa: function(req, res) {
        res.send({
            success: true,
            data: req.decoded.assessoria.tamanhosCamisa
        })
    },
    
    listarNucleos: function(req, res) {
        res.send({
            success: true,
            data: req.decoded.assessoria.nucleos
        })
    }
}