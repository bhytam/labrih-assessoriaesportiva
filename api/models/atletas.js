var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

module.exports = mongoose.model('Atleta', new Schema({
    numero: String,
    cpf: String,
    data_nascimento: Date,
    celular: String,
    assessoria: { type: ObjectId, ref: 'Assessoria' },
    tamanhoCamisa: { type: ObjectId, ref: 'Assessoria.tamanhosCamisa' },
    nucleo: { type: ObjectId, ref: 'Assessoria.nucleos' }
}))