var express = require('express'),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  app = express(),
  port = process.env.PORT || 3000;

app.set("JwtSecret", process.env.JWT_SECRET);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

var Usuario = require("./api/models/usuario"),
  Assessoria = require('./api/models/assessoria'),
  Atleta = require('./api/models/atletas');

var routes = require('./api/routes/routes');
routes(app);

app.listen(port, function () {
  Usuario.findOne({
    usuario: 'labrih'
  }).then(u => {
    if (!u)
      return new Usuario({
        usuario: 'labrih',
        senha: 'labrih'
      }).save()
    else
      return u
  }).then(u => {
    return Promise.all([u, Assessoria.findOne({
      usuario: u._id,
    })])
  }).then((u, a) => {
    if (!a)
      return new Assessoria({
        Nome: u.Nome,
        Usuario: u._id,
        tamanhosCamisa: [{
          Descricao: 'P'
        }, {
          Descricao: 'M'
        }, {
          Descricao: 'G'
        }, {
          Descricao: 'GG'
        }, {
          Descricao: 'XG'
        }]
      })
    return a.save()
  }).then(a => {
    if (a.nucleos.length == 0) {
      a.nucleos.push({ Descricao: 'Beira Mar'});
      a.nucleos.push({ Descricao: 'Polar'});
      a.nucleos.push({ Descricao: 'Crasa'});
      a.nucleos.push({ Descricao: 'Maraponga'});
    }
    return a.save();
  }).then(ret => {
    console.log(ret);
  }).catch(err => {
    console.log(err);
  })
});

console.log(port)
