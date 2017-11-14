var express = require('express'),
  mongoose = require("mongoose"),
  config = require("./config"),
  app = express(),
  port = process.env.PORT || 3000;

mongoose.connect(config.base, { useMongoClient: true });

var User = require("./api/models/user");

app.listen(port, function () {
  var admin = new User({
    email: "contato@labrih.com.br",
    password: "contato"
  })
  admin.save();
});

console.log("ok")
