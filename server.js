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
  // Usuario.findOne({
  //   usuario: 'runners'
  // }).then(u => {
  //   if (!u)
  //     return new Usuario({
  //       usuario: 'runners',
  //       senha: 'esporte'
  //     }).save()
  //   else
  //     return u
  // }).then(u => {
  //   var assessoriaPromise = Assessoria.findOne({
  //     usuario: u._id,
  //   });
  //   return Promise.all([u, assessoriaPromise]);
  // }).then(promisses => {
  //   var u = promisses[0];
  //   var a = promisses[1];

  //   if (!a)
  //     a = new Assessoria({
  //       nome: u.usuario,
  //       usuario: u._id,
  //       tamanhosCamisa: [{
  //         Descricao: 'P'
  //       }, {
  //         Descricao: 'M'
  //       }, {
  //         Descricao: 'G'
  //       }, {
  //         Descricao: 'GG'
  //       }, {
  //         Descricao: 'XG'
  //       }]
  //     })
  //   return a.save()
  // }).then(a => {
  //   console.log(a.nucleos);

  //   if (a.nucleos.length == 0) {
  //     a.nucleos.push({ Descricao: 'Beira Mar' });
  //     a.nucleos.push({ Descricao: 'Polar' });
  //     a.nucleos.push({ Descricao: 'Crasa' });
  //     a.nucleos.push({ Descricao: 'Maraponga' });
  //     a.nucleos.push({ Descricao: 'North Shopping' });
  //   }
  //   return a.save();
  // }).then(ret => {
  //   console.log(ret);
  // }).catch(err => {
  //   console.log(err);
  // })
});

console.log(port)
