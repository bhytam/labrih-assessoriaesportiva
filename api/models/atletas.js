var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
    Assessoria = mongoose.model("Assessoria");

module.exports = mongoose.model('Atleta', new Schema({
    numero: {
        type: String,
        required: [true, 'Informe o número']
    },
    rg: {
        type: String,
        required: [true, 'Informe o rg']
    },
    cpf: {
        type: String,
        required: [true, 'Informe do CPF'],
        validate: {
            validator: cpf => {
                return /\d{11}/.test(cpf);
            },
            message: 'cpf inválido'
        }
    },
    data_nascimento: {
        type: Date,
        required: [true, 'Informe a data de nascimento'],
        validate: {
            validator: data => {
                return !isNaN(data.getTime())
            },
            message: 'data inválida'
        }
    },
    celular: {
        type: String,
        required: [true, 'Informe o celular'],
        validate: {
            validator: (v) => {
                return /\d{11}/.test(v);
            },
            message: 'celular inválido'
        }
    },
    assessoria: { type: ObjectId, ref: 'Assessoria', required: [true, 'Informe a assessoria do atleta'] },
    tamanho_camisa: {
        type: ObjectId,
        ref: 'Assessoria.tamanhosCamisa',
        required: [true, 'informe o tamanho da camisa'],
        validate: {
            validator: (tamanho) => {
                return new Promise((a, r) => {
                    Assessoria.count({
                        'tamanhosCamisa._id': tamanho
                    }).then(c => {
                        a(c > 0);
                    });
                }) 
            },
            message: 'tamanho de camisa inválido'
        }
    },
    nucleo: {
        type: ObjectId,
        ref: 'Assessoria.nucleos',
        required: [true, 'informe o núcleo'],
        validate: {
            validator: (nucleo) => {
                return new Promise((a, r) => {
                    Assessoria.count({
                        'nucleos._id': nucleo
                    }).then(c => {
                        a(c > 0);
                    });
                }) 
            },
            message: 'nucleo inválido'
        }
    },
    ativo: { type: Boolean, default: true },
    nome: {
        type: String,
        required: [true, 'informe o nome']
    },
    email: {
        type: String,
        required: [true, 'informe o email']
    }
}))