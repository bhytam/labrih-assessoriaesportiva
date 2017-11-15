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

var User = require("./api/models/user"),
  Runner = require("./api/models/runner");

var routes = require('./api/routes/routes');
routes(app);

app.listen(port, function () {
  User.findOne({ email: "contato@labrih.com.br" }, function (err, user) {
    if (!user) {
      var user = new User({
        email: "contato@labrih.com.br",
        password: "contato",
        name: "Assessoria Labrih"
      })
      user.save();
    } else {
      user.name = "Assessoria Labrih"
      user.save();
    }
  });
});

console.log("ok")
