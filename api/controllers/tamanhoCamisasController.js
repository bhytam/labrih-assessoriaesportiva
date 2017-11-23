var tamanhoCamisasController = {
    listar: function(req, res) {
        res.send([{
            _id: 1,
            Tamanho: "P"
        },{
            _id: 2,
            Tamanho: "M"
        },{
            _id: 3,
            Tamanho: "G"
        },{
            _id: 4,
            Tamanho: "GG"
        },{
            _id: 1,
            Tamanho: "XGG"
        }])
    }
}

module.exports = tamanhoCamisasController;