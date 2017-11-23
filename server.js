var express = require('express'),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  app = express(),
  port = process.env.PORT || 3000;

app.set("JwtSecret", process.env.JWT_SECRET);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

var Usuario = require("./api/models/usuario");

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
  }).then(u => {
    console.log(u);
  }).catch(err => {
    console.log(err);
  })
});

console.log(port)
