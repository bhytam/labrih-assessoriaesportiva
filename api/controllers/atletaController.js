var mongoose = require('mongoose'),
    Atleta = mongoose.model('Atleta'),
    Assessoria = mongoose.model('Assessoria');

exports.listar = async (req, res) => {
    try {
        var assessoriaId = await Assessoria.findOne({usuario: req.decoded.usuario._id}, '_id');
        var atletas = await Atleta.find({ assessoria: assessoriaId });
        res.send({
            success: true,
            data: atletas
        })

    } catch (e) {
        res.status(500).send({
            success: false,
            message: 'erro interno',
            data: e
        })
    }
}

exports.novoAtleta = async (req, res) => {
    try {
        var assessoriaId = await Assessoria.findOne({
            usuario: req.decoded.usuario._id
        }, 'usuario');

        var atleta = new Atleta(req.body);
        atleta.assessoria = assessoriaId;

        var resultadoValidacao = atleta.validateSync();
        if (resultadoValidacao) {
            res.status(401).send({
                success: false,
                message: 'erro validacao',
                data: resultadoValidacao
            })
            return
        }

        if (await Atleta.count({ cpf: atleta.cpf }) > 0) {
            res.status(401).send({
                success: false,
                message: 'cpf repetido'
            })
            return
        }

        var atletaSalvo = await atleta.save();
        res.send({
            success: true,
            data: atletaSalvo
        })    

    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            message: 'erro interno',
            data: e
        })
    }
}