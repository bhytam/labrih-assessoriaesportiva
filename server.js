var express = require('express'),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  app = express(),
  port = process.env.PORT || 3000;

app.set("JwtSecret", process.env.JWT_SECRET);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

var User = require("./api/models/user"),
  Runner = require("./api/models/runner");

var routes = require('./api/routes/routes');
routes(app);

app.listen(port, function () {
  User.update({},
    { cellphone: "85999981112" },
    function (err, ret) {
      console.log(err);
      console.log(ret);
    })
});

console.log(port)
