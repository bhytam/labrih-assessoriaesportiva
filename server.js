var express = require('express'),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  config = require("./config"),
  app = express(),
  port = process.env.PORT || 3000;

app.set("JwtSecret", config.secret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(config.base, { useMongoClient: true });

var User = require("./api/models/user");

var routes = require('./api/routes/routes'); 
routes(app); 

app.listen(port, function () {
  var admin = new User({
    email: "contato@labrih.com.br",
    password: "contato"
  })
  admin.save();
});

console.log("ok")
