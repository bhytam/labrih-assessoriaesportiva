var mongoose = require('mongoose'),
    Assessoria = mongoose.model('Assessoria');

module.exports = {
    buscarAssessoriaDoUsuario: (usuario_id) => {
        return Assessoria.findOne({ usuario: usuario_id });
    }
}