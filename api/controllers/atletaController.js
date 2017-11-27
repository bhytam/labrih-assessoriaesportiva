var mongoose = require('mongoose'),
    Atleta = mongoose.model('Atleta');

exports.listar = async (req, res) => {
    try {
        var assessoriaId = req.decoded.assessoria._id;

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
        var atleta = new Atleta(req.body);
        atleta.assessoria = req.decoded.assessoria._id;

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

exports.obter = async (req, res) => {
    try {
        var atleta = await Atleta.findOne({
            _id: mongoose.Types.ObjectId(req.params._id),
            assessoria: req.decoded.assessoria._id
        });

        if (!atleta) {
            res.status(401).send({
                success: false,
                message: 'atleta não encontrado'
            })
            return
        }

        res.send({
            success: true,
            data: atleta
        });

    } catch (e) {
        res.status(500).send({
            success: false,
            message: 'erro interno',
            data: e
        })
    }
}

exports.atualizar = async (req, res) => {
    try {
        var assessoria = req.decoded.assessoria._id;
        var atleta = await Atleta.findOne({
            _id: mongoose.Types.ObjectId(req.params._id),
            assessoria: mongoose.Types.ObjectId(assessoria._id)
        });

        if (!atleta) {
            res.status(401).send({
                success: false,
                message: 'atleta não encontrado'
            })
            return
        }

        var atleta = Object.assign(atleta, req.body);
        var validacaoNovoAtleta = atleta.validateSync();
        if (validacaoNovoAtleta) {
            res.status(401).send({
                success: false,
                message: 'atleta inválido',
                data: validacaoNovoAtleta
            });
            return;
        }

        await atleta.save();
        res.send({
            success: true,
            data: atleta
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'erro interno',
            data: error
        })
    }
}