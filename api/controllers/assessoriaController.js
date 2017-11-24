var mongooose = require('mongoose'),
    Assessoria = mongooose.model('Assessoria');

module.exports = {
    listarTamanhosCamisa: function(req, res) {

        Assessoria.findOne({ usuario: req.decoded.usuario._id }, 'tamanhosCamisa')
            .then(a => {
                if (a)
                    res.send({
                        success: true,
                        data: a.tamanhosCamisa
                    });
            }).catch(e => {
                return res.send(500).send({
                    success: false,
                    message: 'erro interno',
                    data: e
                })
            })
    },
    
    listarNucleos: function(req, res) {
        Assessoria.findOne({
            usuario: req.decoded.usuario._id
        }, 'nucleos').then(a => {
            if (a)
                res.send({
                    success: true,
                    data: a.nucleos
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