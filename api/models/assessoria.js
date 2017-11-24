var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var TamanhoCamisaSchema = new Schema({
    Descricao: String
});

var Nucleo = new Schema({
    Descricao: String
})

module.exports = mongoose.model("Assessoria", new Schema({
    nome: String,
    usuario: { type: ObjectId, ref: 'Usuario'},
    tamanhosCamisa: [TamanhoCamisaSchema],
    nucleos: [Nucleo]
}))